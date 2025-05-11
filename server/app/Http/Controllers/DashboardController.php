<?php
// backend/app/Http/Controllers/DashboardController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use App\Models\Star;
use App\Models\Save;
use App\Models\Report;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getStats()
    {
        try {
            $totalPosts = Post::count();
            $totalLikes = Star::count();
            $totalSaves = Save::count();
            $totalReports = Report::count();
    
            return response()->json([
                'posts' => $totalPosts,
                'likes' => $totalLikes, 
                'saves' => $totalSaves,
                'reports' => $totalReports
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
        public function getPostsPerMonth()
    {
        $postsPerMonth = DB::table('post')
            ->select(DB::raw('MONTH(date_p) as month'), DB::raw('COUNT(*) as count'))
            ->whereRaw('YEAR(date_p) = YEAR(CURRENT_DATE())')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json($postsPerMonth);
    }

    public function getRatingsDistribution()
    {
        $ratings = DB::table('stars')
            ->select('rating', DB::raw('COUNT(*) as count'))
            ->groupBy('rating')
            ->orderBy('rating')
            ->get();

        return response()->json($ratings);
    }

    public function getPopularRecipes()
    {
        $popularRecipes = Post::select('id_p', 'title_p', 'average_rating', 'rating_count')
            ->orderBy('average_rating', 'desc')
            ->orderBy('rating_count', 'desc')
            ->limit(10)
            ->get();

        return response()->json($popularRecipes);
    }

    public function getUserActivity()
    {
        $activity = DB::table('users as u')
            ->select('u.username_u', 
                DB::raw('(SELECT COUNT(*) FROM post WHERE id_u = u.id_u) as post_count'),
                DB::raw('(SELECT COUNT(*) FROM comments WHERE id_u = u.id_u) as comment_count')
            )
            ->orderBy('post_count', 'desc')
            ->limit(10)
            ->get();

        return response()->json($activity);
    }
}