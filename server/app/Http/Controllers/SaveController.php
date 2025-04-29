<?php

namespace App\Http\Controllers;

use App\Models\Save;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Import the DB facade

class SaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Save::all(), 200);
    }


    public function store(Request $request)
{
    try {
        $validatedData = $request->validate([
            'id_u' => 'required|integer',
            'id_p' => 'required|integer',
        ]);
    
        $validatedData['date_r'] = now();
        $report = Save::create($validatedData);
    
        return response()->json($report, 201);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile()
        ], 500);
    }
}

    public function getUserSaves($userId) 
    {
        $saves = Save::where('id_u', $userId)->get();
        return response()->json($saves, 200);
    }

    public function checkSaveStatus(Request $request)
    {
        $request->validate([
            'id_u' => 'required',
            'id_p' => 'required',
        ]);

        $existingSave = Save::where('id_u', $request->id_u)
                            ->where('id_p', $request->id_p)
                            ->first();

        return response()->json([
            'is_saved' => $existingSave ? true : false
        ], 200);
    }

    

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $save = Save::find($id);
        if (!$save) {
            return response()->json(['message' => 'Save record not found'], 404);
        }
        return response()->json($save, 200);
    }

    public function showByUser($id)
    {
        $saves = Save::where('id_u', $id)->get();

        if ($saves->isEmpty()) {
            return response()->json(['message' => 'No saves found for this user'], 404);
        }

        return response()->json($saves, 200);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $save = Save::find($id);
        if (!$save) {
            return response()->json(['message' => 'Save record not found'], 404);
        }
        $save->delete();
        return response()->json(['message' => 'Save record deleted successfully'], 200);
    }
}
