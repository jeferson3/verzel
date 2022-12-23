<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class VehicleFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'brand_id' => random_int(1, 43),
            'model_id' => random_int(1, 5),
            'price' => $this->faker->randomFloat(2, 10000, 1000000),
        ];
    }

}
