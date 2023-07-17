<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::middleware('auth:api')->group(function () {
    Route::get('logout', 'AuthController@logout');
    Route::get('/', 'AuthController@user');
    Route::get('user', [AuthController::class, 'user']);

    Route::get('Tasks', [TaskController::class, 'index']);
    Route::post('Tasks', [TaskController::class, 'store']);
    Route::get('Tasks/{id}', [TaskController::class, 'show']);
    Route::put('Tasks/{id}', [TaskController::class, 'update']);
    Route::delete('Tasks/{id}', [TaskController::class, 'destroy']);

});
