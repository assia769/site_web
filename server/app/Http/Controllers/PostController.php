<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Post::all(),200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Validate basic fields
    $validator = Validator::make($request->all(), [
        'title_p' => 'required|string|max:255',
        'discription_p' => 'required|string',
        'statu_p' => 'required|string|in:public,private,archived',
        'id_u' => 'required|integer',
        'date_p' => 'required',  // Less strict validation for the date
        'pic_p' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
    ]);
    
    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    // Format the date correctly for MySQL
    try {
        $dateTime = new \DateTime($request->date_p);
        $formattedDate = $dateTime->format('Y-m-d H:i:s');
    } catch (\Exception $e) {
        return response()->json([
            'errors' => ['date_p' => ['Invalid date format']]
        ], 422);
    }

    // Handle image upload if exists
    $imageName = null;
    if ($request->hasFile('pic_p') && $request->file('pic_p')->isValid()) {
        $image = $request->file('pic_p');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $image->move(public_path('uploads'), $imageName);
    }

    // Create the Post
    try {
        $post = Post::create([
            'title_p' => $request->title_p,
            'discription_p' => $request->discription_p,
            'pic_p' => $imageName, 
            'statu_p' => $request->statu_p,
            'id_u' => $request->id_u,
            'date_p' => $formattedDate,  // Use the properly formatted date
            'total_rating' => 0,
            'rating_count' => 0,
            'average_rating' => 0,
        ]);

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Failed to create post',
            'message' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }
}
