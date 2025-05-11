<?php
// backend/database/seeders/DatabaseSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Admin;
use App\Models\Admine;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Star;
use App\Models\Save;
use App\Models\Report;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Créer 10 utilisateurs
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'username_u' => 'user' . $i,
               'password_u' => Hash::make('password' . $i),
                'email' => 'user' . $i . '@example.com',
                'birthday_u' => '1990-01-' . ($i % 28 + 1),
            ]);
        }

        //Créer un admin
        Admine::create([
            'name_a' => 'Admin Principal',
            'username_a' => 'admin',
            'password_a' => Hash::make('admin123'),
            'nationality_a' => 'Marocain',
            'birthday_a' => '1985-05-15',
            'phonenumb_a' => '+212600000000',
            'email' => 'admin@gmail.com',
        ]);

        // Créer 30 posts
        $statuses = ['public', 'private', 'archived'];
        for ($i = 1; $i <= 30; $i++) {
            $rating_count = rand(0, 20);
            $total_rating = $rating_count > 0 ? rand($rating_count, $rating_count * 5) : 0;
            $average_rating = $rating_count > 0 ? round($total_rating / $rating_count, 2) : 0;
            
            Post::create([
                'title_p' => 'Recette marocaine #' . $i,
                'discription_p' => 'Description de la délicieuse recette marocaine numéro ' . $i,
                'statu_p' => $statuses[array_rand($statuses)],
                'id_u' => rand(1, 10),
                'date_p' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 365) . ' days')),
                'total_rating' => $total_rating,
                'rating_count' => $rating_count,
                'average_rating' => $average_rating,
            ]);
        }

        // Créer des commentaires
        for ($i = 1; $i <= 100; $i++) {
            Comment::create([
                'id_u' => rand(1, 10),
                'id_p' => rand(1, 30),
                'date_c' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 30) . ' days')),
                'comment_c' => 'Commentaire numéro ' . $i . ' sur cette recette.',
            ]);
        }

        // Créer des évaluations (stars)
        for ($i = 1; $i <= 150; $i++) {
            Star::create([
                'id_u' => rand(1, 10),
                'id_p' => rand(1, 30),
                'rating' => rand(1, 5),
            ]);
        }

        // Créer des sauvegardes
        for ($i = 1; $i <= 50; $i++) {
            Save::create([
                'id_u' => rand(1, 10),
                'id_p' => rand(1, 30),
            ]);
        }

        // Créer des signalements
        for ($i = 1; $i <= 15; $i++) {
            Report::create([
                'id_u' => rand(1, 10),
                'id_p' => rand(1, 30),
                'description_r' => 'This is a report description for report #' . $i, // Add a default description
            ]);
        }
    }
}