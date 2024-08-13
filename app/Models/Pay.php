<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pay extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable =  ['user_id', 'loan_id', 'amount', 'operation_id', 'bank', 'pay_date', 'vaucher', 'type', 'status', 'concept'];
}
