<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandAdminResource extends JsonResource
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
            'id'        => $this->id,
            'name'      => $this->name,
            'date'      => Carbon::parse(strtotime($this->created_at))->format('d/m/Y')
        ];
    }
}
