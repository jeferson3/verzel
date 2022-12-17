<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Model;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;
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
        User::create([
            "name"  => "admin",
            "email" => 'admin@email.com',
            "password" => Hash::make(12345)
        ]);

        Model::factory()->count(5)->create();
        Brand::factory()->count(5)->create();
        Vehicle::factory()->count(10)->create();

    }
}
