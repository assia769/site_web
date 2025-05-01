<?php


use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;

// Rediriger la racine vers la page de login
Route::get('/', function () {
    return redirect('/login');
});

// Afficher la page de login
Route::get('/login', function () {
    return view('auth.login');
});

// Afficher la page d'inscription
Route::get('/register', function () {
    return view('auth.register');
});

// Route de test pour l'API web
Route::get('/api-test', function() {
    return response()->json(['message' => 'API test route working!']);
});

// Routes API regroupées
Route::prefix('api')->group(function () {
    // Routes d'authentification
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    
    // Routes du dashboard (sans middleware CORS explicite)
Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
Route::get('/dashboard/posts-per-month', [DashboardController::class, 'getPostsPerMonth']);
Route::get('/dashboard/ratings-distribution', [DashboardController::class, 'getRatingsDistribution']);
Route::get('/dashboard/popular-recipes', [DashboardController::class, 'getPopularRecipes']);
Route::get('/dashboard/user-activity', [DashboardController::class, 'getUserActivity']);
     // Route de test API directe
    Route::get('/direct-test', function() {
        return response()->json(['message' => 'Direct test route working!']);
    });
});