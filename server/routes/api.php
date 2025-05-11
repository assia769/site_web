<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SaveController;
use App\Http\Controllers\StarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// User routes
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::put('/usersconn/{id}', [UserController::class, 'updateconn']);
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


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
Route::get('/dashboard/posts-per-month', [DashboardController::class, 'getPostsPerMonth']);
Route::get('/dashboard/ratings-distribution', [DashboardController::class, 'getRatingsDistribution']);
Route::get('/dashboard/popular-recipes', [DashboardController::class, 'getPopularRecipes']);
Route::get('/dashboard/user-activity', [DashboardController::class, 'getUserActivity']);