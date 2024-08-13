<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    
    public function returnSuccess($code, $data)
    {
        return response()->json([
            'code' => $code,
            'data' => $data
        ], $code);
    }

    public function returnFail($code, $error)
    {
        return response()->json([
            'code' => $code,
            'error' => $error
        ], $code);
    }
}
