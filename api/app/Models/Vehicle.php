<?php

namespace App\Models;

use App\Http\Resources\VehiclePublicResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vehicle extends \Illuminate\Database\Eloquent\Model
{
    use HasFactory;
    protected $fillable = [
        'name',
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

    public function pagination(int $page = 1, int $limit = 10, $filter = "")
    {
        $where = " 1=1 ";
        $bind  = array();

        if (!empty($filter)) {
            $where .= " AND name like CONCAT('%', ?, '%')";
            $bind = array($filter);
        }

        $data = $this->whereRaw($where, $bind);
        $total = $data->count();
        return [
            'data'      => VehiclePublicResource::collection($data->orderBy('price', 'desc')->limit($limit)->offset(($page - 1) * $limit)->get()),
            'total'     => $total,
            'pages'     => ceil($total / $limit),
            'page'      => $page,
            'per_page'  => $limit
        ];
    }

}
