<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => '/v1'], function (){
    Route::group(['prefix' => '/auth'], function (){
        Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
        Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    });
    Route::group(['prefix' => '/public'], function (){
        Route::get('/vehicles', [\App\Http\Controllers\VehiclesController::class, 'index']);
    });
    Route::group(['prefix' => '/admin'], function (){
        Route::apiResource('/vehicles', \App\Http\Controllers\Admin\VehiclesController::class);
    });
});
