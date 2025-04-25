<?php
// backend/app/Models/Admin.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admine';
    protected $primaryKey = 'id_a';

    protected $fillable = [
        'name_a', 'profpic_a', 'nationality_a', 'birthday_a', 'username_a', 'password_a', 'phonenumb_a'
    ];
}