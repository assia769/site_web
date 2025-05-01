<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'id_u';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username_u',
        'profilpic_u',
        'birthday_u',
        'password_u',
        'email',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password_u',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birthday_u' => 'date',
    ];

    // Relation avec les posts
    public function posts()
    {
        return $this->hasMany(Post::class, 'id_u', 'id_u');
    }

    // Relation avec les commentaires
    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_u', 'id_u');
    }
}