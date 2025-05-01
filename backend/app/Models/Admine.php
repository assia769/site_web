<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admine extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'admine';
    protected $primaryKey = 'id_a';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name_a',
        'profpic_a',
        'nationality_a',
        'birthday_a',
        'username_a',
        'password_a',
        'phonenumb_a',
        'email', // Ajoutez cette ligne

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password_a',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birthday_a' => 'date',
    ];
}