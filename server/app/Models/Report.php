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
        'id_u', 'id_p'
    ];
}