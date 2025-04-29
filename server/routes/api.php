<?php

use App\Http\Controllers\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SaveController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/posts', [PostController::class, 'store']);
Route::post('/comment', [CommentController::class, 'store']);
Route::post('/report', [ReportController::class, 'store']);
Route::post('/save', [SaveController::class, 'store']);

Route::get('/save/user/{userId}', [SaveController::class, 'getUserSaves']);
Route::post('/save/check', [SaveController::class, 'checkSaveStatus']);
Route::get('/save', [SaveController::class, 'index']);
Route::get('/save/{id}', [SaveController::class, 'show']);
Route::delete('/save/{id}', [SaveController::class, 'destroy']);