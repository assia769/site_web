<?php
// backend/app/Models/Save.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Save extends Model
{
    protected $table = 'save';
    protected $primaryKey = 'id_s';
    public $timestamps = false;

    protected $fillable = [
        'id_u', 'id_p'
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