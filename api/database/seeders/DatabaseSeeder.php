<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Model;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $brands = array(
            array('name' => 'Abarth'),
            array('name' => 'Aiways'),
            array('name' => 'Alfa Romeo'),
            array('name' => 'Alpine'),
            array('name' => 'Aston Martin'),
            array('name' => 'Audi'),
            array('name' => 'Bentley'),
            array('name' => 'BMW'),
            array('name' => 'Citroën'),
            array('name' => 'Cupra'),
            array('name' => 'Dacia'),
            array('name' => 'DS'),
            array('name' => 'Ferrari'),
            array('name' => 'Fiat'),
            array('name' => 'Ford'),
            array('name' => 'Hyundai'),
            array('name' => 'Jaguar'),
            array('name' => 'JEEP'),
            array('name' => 'KIA'),
            array('name' => 'Lamborghini'),
            array('name' => 'Land Rover'),
            array('name' => 'Lexus'),
            array('name' => 'Lotus'),
            array('name' => 'Maserati'),
            array('name' => 'Mazda'),
            array('name' => 'Mercedes - Benz'),
            array('name' => 'MG'),
            array('name' => 'MINI'),
            array('name' => 'Mitsubishi'),
            array('name' => 'Nissan'),
            array('name' => 'Opel'),
            array('name' => 'Peugeot'),
            array('name' => 'Polestar'),
            array('name' => 'Porsche'),
            array('name' => 'Renault'),
            array('name' => 'SEAT'),
            array('name' => 'Škoda'),
            array('name' => 'Smart'),
            array('name' => 'Suzuki'),
            array('name' => 'TESLA'),
            array('name' => 'Toyota'),
            array('name' => 'Volkswagen'),
            array('name' => 'Volvo')
        );
        $models = array(
            array('name' => 'Hatchs'),
            array('name' => 'Sedans'),
            array('name' => 'SUVs'),
            array('name' => 'Picapes'),
            array('name' => 'Utilitários'),
        );

        DB::table('brands')
            ->insert($brands);

        DB::table('models')
            ->insert($models);

        User::create([
            "name" => "admin",
            "email" => 'admin@email.com',
            "password" => Hash::make(12345)
        ]);

        Vehicle::factory()->count(100)->create();

    }
}
