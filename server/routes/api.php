<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SaveController;
use App\Http\Controllers\StarController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// User routes
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::put('/userspic/{id}', [UserController::class, 'updatePic']);


// Post routes
Route::post('/posts', [PostController::class, 'store']);

// Comment routes
Route::post('/comment', [CommentController::class, 'store']);

// Report routes
Route::post('/report', [ReportController::class, 'store']);

// Save routes
Route::post('/save', [SaveController::class, 'store']);
Route::get('/save/user/{userId}', [SaveController::class, 'getUserSaves']);
Route::post('/save/check', [SaveController::class, 'checkSaveStatus']);
Route::get('/save', [SaveController::class, 'index']);
Route::get('/save/{id}', [SaveController::class, 'show']);
Route::delete('/save/{id}', [SaveController::class, 'destroy']);

// Rating routes
Route::post('/rating', [StarController::class, 'store']);
Route::post('/rating/check', [StarController::class, 'checkRating']);