<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;

Route::prefix('api')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
    Route::get('/dashboard/posts-per-month', [DashboardController::class, 'getPostsPerMonth']);
    Route::get('/dashboard/ratings-distribution', [DashboardController::class, 'getRatingsDistribution']);
    Route::get('/dashboard/popular-recipes', [DashboardController::class, 'getPopularRecipes']);
    Route::get('/dashboard/user-activity', [DashboardController::class, 'getUserActivity']);
});
