<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectTaskController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

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

//projects
Route::post('/addprojects',[ProjectController::class, 'store'])->name('add.project');

Route::post('/updateprojects/{id}',[ProjectController::class, 'update']);

Route::delete('/deleteprojects/{id}',[ProjectController::class, 'destroy']);

Route::resource('tasks',TaskController::class);

//Route::resource('task/{id}',TaskController::class);

Route::resource('users',UserController::class);

Route::resource('categories',CategoryController::class);

Route::get('/projects/{id}/tasks',[ProjectTaskController::class,'index'])->name('projects.tasks.index');

Route::resource('projects.tasks',ProjectTaskController::class)->only(['index']);

Route::get('/categories/{id}',[CategoryController::class, 'show']);

//category
Route::post('/addcategory',[CategoryController::class, 'store']);

Route::post('/updatecategory/{id}',[CategoryController::class, 'update']);

Route::delete('/deletecategory/{id}',[CategoryController::class, 'destroy']);

//task
Route::post('/addtask',[TaskController::class, 'store']);

Route::post('/updatetask/{id}',[TaskController::class, 'update']);

//Route::delete('/deletetask/{id}',[TaskController::class, 'destroy']);

//user
Route::post('/adduser',[UserController::class, 'store']);

Route::post('/updateuser/{id}',[UserController::class, 'update']);

Route::delete('/deleteuser/{id}',[UserController::class, 'destroy']);

Route::post('/register',[AuthController::class,'register']);

Route::post('/login',[AuthController::class,'login']);

Route::group(['middleware'=>['auth:sanctum']], function(){
    Route::get('/profile',function(Request $request){
        return auth()->user();
    });
    Route::resource('task',TaskController::class)->only('destroy','store','update');

    //Route::get('/projects/{id}',[ProjectController::class, 'show']);

    Route::post('/logout',[AuthController::class,'logout']);

});


Route::post('/forgotpassworddd', [ForgotPasswordController::class, 'sendResetLink' ]);


Route::post('/passworddd/reset/{token}',[ ResetPasswordController::class,'reset']);

// Ruta za dobavljanje paginiranih rezultata
Route::get('/taskspaginacija', [TaskController::class, 'index']);

// Ruta za filtriranje 
Route::get('/tasks/filter/{status}', [TaskController::class, 'filterByStatus']);

Route::get('/projects/filter/{priority}', [ProjectController::class, 'filterByPriority']);

Route::get('/users/filter/{role}', [UserController::class, 'filterByRole']);



