<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
	public function login(Request $request){
		try {
			$validator = Validator::make($request->all(), [
				'dni'=> 'required',
				'password'=>'required'
		]);

		} catch (Exception $e) {
			return $this->returnFail(505,['message'=> 'Error en los datos.']);
		}
		if($validator->fails()){
			return $this->returnFail(505,['message'=> 'Error en los datos.']);
		}
		


		try{
			$token = JWTAuth::attempt([
				'dni'  		=> $request->dni,
				'password'	=> $request->password
			]);
		}catch (Exception $e) {
			return $this->returnFail(505,['message'=> $e->getMessage()]);
		}
		if(!$token){
			return $this->returnFail(404,['message'=> 'Estas credenciales no coinciden con nuestros registros.']);
			
		}
		return $this->returnSuccess(200,['access_token' => $token]);
	}
	public function logout(Request $request)
	{
		try {
			auth()->logout();
		} catch (Exception $th) {
			return $this->returnFail(505,['message'=> $th->getMessage()]);
		}

		return $this->returnSuccess(200,[]);

	}
	public function checkToken(Request $request)
	{
		return $this->returnSuccess(200, 'ok');

	}
	protected function createNewToken($token){
			return response()->json([
					'access_token' => $token,
					'token_type' => 'bearer',
					'user' => auth()->user()
			]);
	}
	public function getUser(Request $request){
		return $this->returnSuccess(200, User::with('wallet')->find($request->user()->id));

	}
	public function refresh(){
			return $this->createNewToken(JWTAuth::refresh());
	}
}
