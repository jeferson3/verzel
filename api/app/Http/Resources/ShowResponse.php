<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowResponse extends JsonResource
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
            'status'    => true,
            'timestamp' => now(),
            'message'   => 'Operação realizada com sucesso!'
        ];
    }
}
