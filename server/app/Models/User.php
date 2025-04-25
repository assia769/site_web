<?php
// backend/app/Models/User.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id_u';

    protected $fillable = [
        'username_u', 'profilpic_u', 'birthday_u', 'password_u', 'email'
    ];

    public function posts()
    {
        return $this->hasMany(Post::class, 'id_u', 'id_u');
    }
}
