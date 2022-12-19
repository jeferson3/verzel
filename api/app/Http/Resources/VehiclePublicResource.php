<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

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
            'token'         => md5($this->id),
            'name'          => $this->name,
            'description'   => $this->description,
            'brand'         => $this->Brand->name,
            'model'         => $this->Model->name,
            'image'         => $this->photo ? asset('storage/' . $this->photo) : URL::to('/') . '/img/sem_imagem.webp',
            'value'         => 'R$ ' . number_format($this->price, 2, ',', '.')
        ];
    }
}
