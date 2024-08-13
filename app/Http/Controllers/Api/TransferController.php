<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transfer;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    //
    public function getTransferById($id) {
        $transfer = Transfer::with('user_to.user')->find($id);

        return $this->returnSuccess(200, $transfer);
    }
}
