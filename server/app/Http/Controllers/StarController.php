<?php

namespace App\Http\Controllers;

use App\Models\Star;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB; // Import the DB facade


class StarController extends Controller
{
    /**
     * Check if user has already rated a post
     */
    public function checkRating(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_u' => 'required|integer',
            'id_p' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $existingRating = Star::where('id_u', $request->id_u)
                              ->where('id_p', $request->id_p)
                              ->first();

        return response()->json([
            'has_rated' => (bool) $existingRating,
            'rating' => $existingRating ? $existingRating->rating : null
        ]);
    }

    /**
     * Store a new rating or update existing one
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_u' => 'required|integer',
            'id_p' => 'required|integer',
            'rating' => 'required|numeric|min:0.5|max:5',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Start a database transaction
        DB::beginTransaction();
        
        try {
            $post = Post::findOrFail($request->id_p);
            
            // Check if user has already rated this post
            $existingRating = Star::where('id_u', $request->id_u)
                                  ->where('id_p', $request->id_p)
                                  ->first();
            
            if ($existingRating) {
                // Update existing rating - remove old rating from totals first
                $post->total_rating = $post->total_rating - $existingRating->rating + $request->rating;
                $existingRating->rating = $request->rating;
                $existingRating->save();
            } else {
                // Create new rating
                Star::create([
                    'id_u' => $request->id_u,
                    'id_p' => $request->id_p,
                    'rating' => $request->rating
                ]);
                
                // Update post statistics
                $post->total_rating += $request->rating;
                $post->rating_count += 1;
            }
            
            // Recalculate average
            $post->average_rating = $post->rating_count > 0 ? 
                                   $post->total_rating / $post->rating_count : 0;
            
            $post->save();
            
            DB::commit();
            
            return response()->json([
                'message' => 'Rating saved successfully',
                'post' => $post
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'error' => 'Failed to save rating',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}