<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AccountBank extends Model
{
    use HasFactory, SoftDeletes ;
    protected $table = "accounts_bank";
    protected $fillable = ['account_number', 'account_type', 'account_owner', 'account_owner_dni', 'user_id', 'bank_id',];

    function user() {
        return $this->belongsTo(User::class, 'user_id');

    }
    
    function bank() {
        return $this->belongsTo(Bank::class, 'bank_id');

    }

}
