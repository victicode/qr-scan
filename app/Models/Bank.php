<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'logo', 'status'];

    function bank_accounts(){
        return $this->hasMany(Bank::class)->orderBy('created_at', 'desc');
    }
}
