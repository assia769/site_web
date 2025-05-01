<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // Vérifie si l'utilisateur est authentifié
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Vérifie le rôle de l'utilisateur
        $userRole = $request->session()->get('role', '');
        
        if ($userRole !== $role) {
            return response()->json(['message' => 'Forbidden: you do not have the right permission'], 403);
        }

        return $next($request);
    }
}