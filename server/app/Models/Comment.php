<?php
// backend/app/Models/Comment.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';
    protected $primaryKey = 'id_c';
    public $timestamps = false;

    protected $fillable = [
        'id_u', 'id_p', 'date_c', 'comment_c'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_u', 'id_u');
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'id_p', 'id_p');
    }
}