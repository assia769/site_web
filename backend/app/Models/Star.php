<?php
// backend/app/Models/Star.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Star extends Model
{
    protected $table = 'stars';
    protected $primaryKey = 'id_st';
    public $timestamps = false;

    protected $fillable = [
        'id_u', 'id_p', 'rating'
    ];
}