<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Loan extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['loan_number', 'user_id', 'due_date', 'type', 'amount', 'amount_to_pay', 'quotas'];

    public function redTapes(){
        return $this->hasOne(RedTape::class,'loan_id', 'id');
    }
    public function pays(){
        return $this->hasMany(Pay::class,'loan_id', 'id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id', 'id');
    }
}
