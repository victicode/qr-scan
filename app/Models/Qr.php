<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Qr extends Model
{
    use HasFactory, SoftDeletes;

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'users_x_qrs');
    }
}
