<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admine;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function index()
    {
        $admins = Admine::all();
        return response()->json([
            'status' => 'success',
            'data' => $admins
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_a' => 'required|string|max:255',
            'username_a' => 'required|string|email|max:255|unique:admine,username_a',
            'password_a' => 'required|string|min:8',
            'phonenumb_a' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 422);
        }

        $admin = Admine::create([
            'name_a' => $request->name_a,
            'username_a' => $request->username_a,
            'password_a' => Hash::make($request->password_a),
            'phonenumb_a' => $request->phonenumb_a,
            'email' => $request->username_a, // <-- Ajoute cette ligne

        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Admin créé avec succès',
            'data' => $admin
        ], 201);
    }

    public function show(string $id)
    {
        $admin = Admine::find($id);

        if (!$admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Admin non trouvé'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $admin
        ]);
    }

    public function update(Request $request, string $id)
    {
        $admin = Admine::find($id);

        if (!$admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Admin non trouvé'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name_a' => 'sometimes|string|max:255',
            'username_a' => 'sometimes|string|email|max:255|unique:admine,username_a,' . $id . ',id_a',
            'phonenumb_a' => 'sometimes|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 422);
        }

        $admin->update($request->only(['name_a', 'username_a', 'phonenumb_a']));

        return response()->json([
            'status' => 'success',
            'message' => 'Admin mis à jour avec succès',
            'data' => $admin
        ]);
    }

    public function destroy(string $id)
    {
        $admin = Admine::find($id);

        if (!$admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Admin non trouvé'
            ], 404);
        }

        $admin->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Admin supprimé avec succès'
        ]);
    }

    public function destroyByEmail(string $email)
    {
        $admin = Admine::where('username_a', $email)->first();

        if (!$admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Admin non trouvé'
            ], 404);
        }

        $admin->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Admin supprimé avec succès'
        ]);
    }
}