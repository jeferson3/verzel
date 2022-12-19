<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleAdminResource extends JsonResource
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
            'id'            => $this->id,
            'name'          => $this->name,
            'description'   => $this->description,
            'brand'         => BrandAdminResource::make($this->whenLoaded('Brand')),
            'model'         => ModelAdminResource::make($this->whenLoaded('Model')),
            'photo'         => $this->photo,
            'price'         => $this->price,
            'date'          => Carbon::parse(strtotime($this->created_at))->format('d/m/Y')
        ];
    }
}
