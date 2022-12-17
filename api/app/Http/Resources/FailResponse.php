<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FailResponse extends JsonResource
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
            'status'    => false,
            'timestamp' => now(),
            'message'   => $this->resource['message'] ?? 'Falha ao realizar a operação!'
        ];
    }
}
