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

    public function pagination(int $page = 1, int $limit = 10, $filter = "", string $order = 'id', int $startPrice = null, int $endPrice = null, int $brand_id = null, int $model_id = null, string $type = '')
    {
        $where = " 1=1 ";
        $bind  = array();

        if (!empty($filter)) {
            $where .= " AND (name like CONCAT('%', ?, '%') or description like CONCAT('%', ?, '%'))";
            $bind[] = $filter;
            $bind[] = $filter;
        }

        if ($startPrice || $endPrice) {
            if ($startPrice && $endPrice) {
                $where .= " AND (price >= ? AND price <= ?)";
                $bind[] = $startPrice;
                $bind[] = $endPrice;
            }
            else if ($startPrice && !$endPrice) {
                $where .= " AND price >= ?";
                $bind[] = $startPrice;
            }
            else if (!$startPrice && $endPrice) {
                $where .= " AND price <= ?";
                $bind[] = $endPrice;
            }
        }

        if ($brand_id){
            $where .= " AND brand_id = ?";
            $bind[] = $brand_id;
        }

        if ($model_id){
            $where .= " AND model_id = ?";
            $bind[] = $model_id;
        }

        $data   = $this->whereRaw($where, $bind);
        $total  = $data->count();
        $res    = [];
        if ($type === self::ADMIN) {
            $res = $data->orderBy($order, 'desc')
                ->with(['Brand', 'Model'])
                ->limit($limit)->offset(($page - 1) * $limit)->get();
        }
        else if ($type === self::PUBLIC) {
            $res = $data->orderBy($order, 'desc')
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
            'description'   => $data['description'],
            'brand_id'      => $data['brand_id'],
            'model_id'      => $data['model_id'],
            'photo'         => $path,
            'price'         => $data['price'],
        ]);
    }

    public function updateVehicle(Vehicle $vehicle, array $data, UploadedFile $photo = null)
    {
        $path = null;

        if (!is_null($photo) && Storage::disk('public')->exists($vehicle->photo)){
            Storage::disk('public')->delete($vehicle->photo);
        }
        if (!is_null($photo)){
            $fileName = date('YdmHis') . '_' . uniqid(time()) . '.' . $photo->getClientOriginalExtension();
            $path = $photo->storeAs('vehicles', $fileName, 'public');
        }

        return $this->update([
            'name'          => $data['name'],
            'description'   => $data['description'],
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
