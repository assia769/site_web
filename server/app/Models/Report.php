<?php
// backend/app/Models/Report.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $table = 'report';
    protected $primaryKey = 'id_r';
    public $timestamps = false;

    protected $fillable = [
        'id_u', 'id_p' , 'description_r', 'date_r'
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