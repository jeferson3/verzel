<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class VehicleFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'brand_id' => random_int(1, 5),
            'model_id' => random_int(1, 5),
            'photo' => "sem_imagem.png",
            'price' => $this->faker->randomFloat(2, 10, 100),
        ];
    }

}
