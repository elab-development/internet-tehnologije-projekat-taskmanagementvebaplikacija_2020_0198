<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/projects',[ProjectController::class, 'index']);

Route::get('/projects/{id}',[ProjectController::class, 'show']);

Route::post('/addprojects',[ProjectController::class, 'store']);

Route::post('/updateprojects/{id}',[ProjectController::class, 'update']);

Route::delete('/deleteprojects/{id}',[ProjectController::class, 'destroy']);