<?php

namespace App\Models;

use App\Http\Resources\VehicleAdminResource;
use App\Http\Resources\VehiclePublicResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class Vehicle extends \Illuminate\Database\Eloquent\Model
{
    use HasFactory;

    public const PUBLIC = 'PUBLIC';
    public const ADMIN = 'ADMIN';

    protected $fillable = [
        'name',
        'description',
        'brand_id',
        'model_id',
        'photo',
        'price',
    ];

    public function Brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function Model(): BelongsTo
    {
        return $this->belongsTo(Model::class);
    }

    public function pagination(int $page = 1, int $limit = 10, $filter = "", $type = '')
    {
        $where = " 1=1 ";
        $bind  = array();

        if (!empty($filter)) {
            $where .= " AND (name like CONCAT('%', ?, '%') or description like CONCAT('%', ?, '%'))";
            $bind = array($filter, $filter);
        }

        $data   = $this->whereRaw($where, $bind);
        $total  = $data->count();
        $res    = [];
        if ($type === self::ADMIN) {
            $res = $data->orderBy('price', 'desc')
                ->with(['Brand', 'Model'])
                ->limit($limit)->offset(($page - 1) * $limit)->get();
        }
        else if ($type === self::PUBLIC) {
            $res = $data->orderBy('price', 'desc')
                ->limit($limit)->offset(($page - 1) * $limit)->get();
        }
        return [
            'data'      => $type === self::PUBLIC ? VehiclePublicResource::collection($res) :
                (
                    $type === self::ADMIN ?
                        VehicleAdminResource::collection($res) :
                        []
                )
            ,
            'total'     => $total,
            'pages'     => ceil($total / $limit),
            'page'      => $page,
            'per_page'  => $limit
        ];
    }

    public function saveNewVehicle(array $data, UploadedFile $photo)
    {
        $fileName = date('YdmHis') . '_' . uniqid(time()) . '.' . $photo->getClientOriginalExtension();
        $path = $photo->storeAs('vehicles', $fileName, 'public');

        return $this->create([
            'name'          => $data['name'],
            'brand_id'      => $data['brand_id'],
            'model_id'      => $data['model_id'],
            'photo'         => $path,
            'price'         => $data['price'],
        ]);
    }

    public function updateVehicle(Vehicle $vehicle, array $data, UploadedFile $photo)
    {
        if (Storage::disk('public')->exists($vehicle->photo)){
            Storage::disk('public')->delete($vehicle->photo);
        }

        $fileName = date('YdmHis') . '_' . uniqid(time()) . '.' . $photo->getClientOriginalExtension();
        $path = $photo->storeAs('vehicles', $fileName, 'public');

        return $this->update([
            'name'          => $data['name'],
            'brand_id'      => $data['brand_id'],
            'model_id'      => $data['model_id'],
            'photo'         => $path,
            'price'         => $data['price'],
        ]);
    }

    public function deleteVehicle()
    {
        $vehicle = $this;

        if (Storage::disk('public')->exists($vehicle->photo)){
            Storage::disk('public')->delete($vehicle->photo);
        }

        return $vehicle->delete();
    }

}
