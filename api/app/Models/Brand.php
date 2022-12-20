<?php

namespace App\Models;

use App\Http\Resources\BrandPublicResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Brand extends \Illuminate\Database\Eloquent\Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public static function getAll()
    {
        return BrandPublicResource::collection(self::all());
    }

}
