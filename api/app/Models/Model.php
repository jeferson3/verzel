<?php

namespace App\Models;

use App\Http\Resources\ModelPublicResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Model extends \Illuminate\Database\Eloquent\Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];


    public static function getAll()
    {
        return ModelPublicResource::collection(self::all());
    }

}
