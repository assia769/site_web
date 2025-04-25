<?php
// backend/app/Models/Post.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'post';
    protected $primaryKey = 'id_p';
    public $timestamps = false;

    protected $fillable = [
        'title_p', 'discription_p', 'pic_p', 'statu_p', 'id_u', 'date_p', 
        'total_rating', 'rating_count', 'average_rating'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_u', 'id_u');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_p', 'id_p');
    }
}