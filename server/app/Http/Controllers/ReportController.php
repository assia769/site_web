<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Post;
use Illuminate\Support\Facades\DB;


use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    try {
        $validatedData = $request->validate([
            'id_u' => 'required|integer',
            'id_p' => 'required|integer',
            'description_r' => 'required|string|max:500', 
        ]);
    
        $validatedData['date_r'] = now();
        $report = Report::create($validatedData);
    
        return response()->json($report, 201);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile()
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
    
    // Nouvelle méthode pour récupérer tous les rapports pour le dashboard admin
   // app/Http/Controllers/YourController.php

public function getReportedPosts()
{
    $reportedPosts = DB::table('report')
        ->join('post', 'report.id_p', '=', 'post.id_p')
        ->join('users', 'report.id_u', '=', 'users.id_u')
        ->select(
            'report.id_r as report_id',
            'report.id_p as post_id',
            'report.id_u as user_id',
            'report.description_r as description',
            'report.date_r as reported_at',
            'post.title_p as post_title',
            'post.discription_p as post_description',
            'post.pic_p as post_pic',
            'users.username_u as reported_by'
        )
        ->orderBy('report.date_r', 'desc')
        ->get();

    return response()->json($reportedPosts);
}


    // Méthode pour supprimer un post signalé
    // public function deleteReportedPost($id)
    // {
    //     try {
    //         // Récupérer le rapport pour obtenir l'ID du post
    //         $report = Report::findOrFail($id);
    //         $postId = $report->id_p;
            
    //         // Supprimer le post
    //         $post = Post::findOrFail($postId);
    //         $post->delete();
            
    //         // Supprimer aussi les rapports associés à ce post
    //         Report::where('id_p', $postId)->delete();
            
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Post supprimé avec succès'
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Erreur lors de la suppression: ' . $e->getMessage()
    //         ], 500);
    //     }
    // }
    public function deleteReportedPost($id)
{
    try {
        // Récupérer le rapport pour obtenir l'ID du post
        $report = Report::findOrFail($id);
        $postId = $report->id_p;
        
        // Supprimer le post
        $post = Post::findOrFail($postId);
        $post->delete();
        
        // Supprimer aussi les rapports associés à ce post
        Report::where('id_p', $postId)->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Post supprimé avec succès'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la suppression: ' . $e->getMessage()
        ], 500);
    }
}
    // Méthode pour ignorer un signalement
    public function ignoreReport($id)
    {
        try {
            // Supprimer uniquement le rapport
            Report::findOrFail($id)->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Signalement ignoré avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'ignorance du signalement: ' . $e->getMessage()
            ], 500);
        }
    }
}