<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RedTape extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'red_tapes';
    protected $fillable = [
        'business',
        'business_address',
        'business_phone',
        'ips',
        'boss_name',
        'boss_phone',
        'reference_name',
        'reference_phone',
        'reference_relationship',
        'informconf',
        'work_certificate',
        'last_ips',
        'loan_id',
        'user_id',
    ];
    public function loan(){
        return $this->belongsTo(RedTape::class,'loan_id', 'id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id', 'id');
    }
}
