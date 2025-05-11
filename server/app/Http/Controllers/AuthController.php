<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admine;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // public function register(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'username_u' => 'required|string|max:100',
    //         'email' => 'required|string|email|max:50|unique:users',
    //         'password_u' => 'required|string|min:6',
    //         'birthday_u' => 'nullable|date',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => $validator->errors()->first()
    //         ], 422);
    //     }

    //     $user = User::create([
    //         'username_u' => $request->username_u,
    //         'email' => $request->email,
    //         'password_u' => Hash::make($request->password_u),
    //         'birthday_u' => $request->birthday_u, 
    //         ]);

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'User registered successfully',
    //         'user' => $user
    //     ], 201);
    // }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username_u' => 'required|string|max:100',
            'email' => 'required|string|email|max:50|unique:users',
            'password_u' => 'required|string|min:6',
            'birthday_u' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 422);
        }

        $user = User::create([
            'username_u' => $request->username_u,
            'email' => $request->email,
            'password_u' => Hash::make($request->password_u),
            'birthday_u' => $request->birthday_u, 
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }


    // public function login(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|string|email',
    //         'password' => 'required|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => $validator->errors()->first()
    //         ], 422);
    //     }

    //     // Essayer de se connecter en tant qu'utilisateur
    //     $user = User::where('email', $request->email)->first();
        
    //     if ($user && Hash::check($request->password, $user->password_u)) {
    //         // Créer un token pour l'utilisateur (si vous utilisez Sanctum ou Passport)
    //         // Ou simplement retourner les informations de l'utilisateur
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Login successful',
    //             'user' => $user,
    //             'role' => 'user'
    //         ]);
    //     }
        
    //     // Essayer de se connecter en tant qu'admin
    //    // $admin = Admine::where('username_a', $request->email)->first();
    //     $admin = Admine::where('username_a', $request->email)
    //      ->orWhere('email', $request->email) // Pour permettre la connexion avec email
    //     ->first();
    //     if ($admin && Hash::check($request->password, $admin->password_a)) {
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Admin login successful',
    //             'user' => $admin,
    //             'role' => 'admin'
    //         ]);
    //     }

    //     return response()->json([
    //         'success' => false,
    //         'message' => 'Invalid credentials'
    //     ], 401);
    // }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 422);
        }
    
        // Essayer de se connecter en tant qu'admin
        $admin = Admine::where('username_a', $request->email)
            ->orWhere('email', $request->email) // Vérifiez que ce champ existe
            ->first();
             
        if ($admin && Hash::check($request->password, $admin->password_a)) {
            // Supprimer les anciens tokens si nécessaire
            $admin->tokens()->delete();
            
            // Créer un nouveau token
            $token = $admin->createToken('admin-token')->plainTextToken;
            
            return response()->json([
                'success' => true,
                'message' => 'Admin login successful',
                'user' => $admin,
                'role' => 'admin',
                'token' => $token // Ajoutez le token à la réponse
            ]);
        }
    
        // Essayer de se connecter en tant qu'utilisateur
        $user = User::where('email', $request->email)->first();
        
        if ($user && Hash::check($request->password, $user->password_u)) {
            // Supprimer les anciens tokens si nécessaire
            $user->tokens()->delete();
            
            // Créer un nouveau token
            $token = $user->createToken('user-token')->plainTextToken;
            
            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'user' => $user,
                'role' => 'user',
                'token' => $token // Ajoutez le token à la réponse
            ]);
        }
    
        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }
    public function logout(Request $request)
    {
        // Récupérer le token de l'utilisateur actuel
        $user = $request->user();
        
        if ($user) {
            // Révoquer le token actuel
            $user->currentAccessToken()->delete();
        }
        
        // Invalider la session
        $request->session()->invalidate();
        
        // Régénérer le token de session
        $request->session()->regenerateToken();
        
        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie'
        ]);
    }
}