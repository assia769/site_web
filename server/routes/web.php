<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SaveController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/testuser/{id}',[UserController::class,'show']);
Route::get('/posts',[PostController::class,'index']);
Route::get('/users',[UserController::class,'index']);
Route::get('/comments',[CommentController::class,'index']);
Route::get('/saves/{id}',[SaveController::class,'showByUser']);

require __DIR__.'/auth.php';




