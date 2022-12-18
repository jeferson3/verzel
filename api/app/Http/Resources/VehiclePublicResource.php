<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehiclePublicResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|\JsonSerializable
     */
    public function toArray($request): array|\JsonSerializable|Arrayable
    {
        return [
            'token'     => md5($this->id),
            'name'      => $this->name,
            'brand'     => $this->Brand->name,
            'model'     => $this->Model->name,
            'image'     => asset('storage/' . $this->photo),
            'value'     => 'R$ ' . number_format($this->price, 2, ',', '.')
        ];
    }
}
