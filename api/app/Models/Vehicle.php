<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vehicle extends Model
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

}
