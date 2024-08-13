<?php

namespace App\Http\Controllers\Api;

use App\Models\Qr;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class QrController extends Controller
{
    //
    public function storeQr() {

    }
    public function getQrByCode(Request $request) {
        $qr = Qr::where('code', $request->code);
    }
    public function scanCode(Request $request) {
        $qr = Qr::where('code', $request->code)->first();

        if(!$qr) return $this->returnFail(400, 'Qr no valido');
        
        if($this->isScaned($qr->id, $request->user()->id)) return $this->returnFail(400, 'Qr ya escaneado');
        

        DB::table('users_x_qrs')->insert([
            'user_id'     => $qr->id,
            'qr_id'       => $request->user()->id,
        ]);
        
        $user = User::with('qrScan')->find($request->user()->id); 

        return $this->returnSuccess(200, $user);
    }
    public function getAll() {
        
    }
    private function isScaned($user, $qr){
        $isScan = DB::table('users_x_qrs')->where('user_id', $user)->where('qr_id', $qr)->count();
        
        return $isScan == 1;
    }
}
