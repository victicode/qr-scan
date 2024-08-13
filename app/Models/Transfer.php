<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transfer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['from_id', 'to_id', 'amount', 'type', 'status', 'concept'];

    public function user_from(){
        return $this->belongsTo(Wallet::class,'from_id', 'id');
    }

    public function user_to(){
        return $this->belongsTo(Wallet::class,'to_id', 'id');
    }
}
