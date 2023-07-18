<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['json.response'])->group(function () {

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('test', function () {
        return response()->json(['message' => 'Tasks API', 'status' => 'Connected']);
    });

});

Route::get('send/email', function(){

	$send_mail = 'test@gmail.com';

    dispatch(new App\Jobs\SendEmailJob($send_mail));

    dd('send mail successfully !!');
});
