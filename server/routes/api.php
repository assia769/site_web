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
use App\Http\Controllers\AdminController;


use App\Models\User;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
//JJJJJJJJJJJJJJJJJJJJJJJJJ
// Route::get('/admins', [AdminController::class, 'index']);
// Route::post('/admins', [AdminController::class, 'store']);
// Route::delete('/admins/{id}', [AdminController::class, 'destroy']);
// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::apiResource('admins', AdminController::class);
//     Route::delete('admins/by-email/{email}', [AdminController::class, 'destroyByEmail']);
// });

// Route accessible sans authentification pour l'utilisateur
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// NOUVELLES ROUTES NON AUTHENTIFIÉES POUR LE DASHBOARD ADMIN
// Ces routes sont publiques et permettent de contourner temporairement le problème d'authentification
Route::prefix('api/non-auth')->group(function () {
    Route::get('/admins', [AdminController::class, 'index']);
    Route::post('/admins', [AdminController::class, 'store']);
    Route::delete('/admins/{id}', [AdminController::class, 'destroy']);
    Route::delete('/admins/by-email/{email}', [AdminController::class, 'destroyByEmail']);
});

// Routes protégées par authentification (originales)
Route::middleware(['auth:sanctum'])->group(function () {
    // Routes admin
    Route::apiResource('admins', AdminController::class);
    Route::delete('admins/by-email/{email}', [AdminController::class, 'destroyByEmail']);
});
// routes/api.php
Route::delete('/users/{id}', function($id) {
    $user = User::find($id);
    
    if(!$user) {
        return response()->json(['error' => 'Utilisateur non trouvé'], 404);
    }

    $user->delete();
    return response()->json(['success' => true], 200); // Réponse claire
});// User routes
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


Route::get('/reports', [ReportController::class, 'getReportedPosts']);
Route::delete('/reports/{id}/delete', [ReportController::class, 'deleteReportedPost']);
Route::delete('/reports/{id}/ignore', [ReportController::class, 'ignoreReport']);

Route::post('/reports/{id}/delete', [ReportController::class, 'deleteReportedPost']);
Route::post('/reports/{id}/ignore', [ReportController::class, 'ignoreReport']);