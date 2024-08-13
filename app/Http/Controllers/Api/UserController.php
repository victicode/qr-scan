<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\User;
use App\Models\Wallet;
use Twilio\Rest\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request){
        try {
            $user = User::find($request->user()->id ?? 1);
        } catch (Exception $th) {
            $this->returnSuccess(400, $th->getMessage() );
        }
		return  $this->returnSuccess(200,  [ 'user' => $user ] );

    }
    public function store(Request $request){
        $validated = $this->validateFieldsFromInput($request->all()) ;

        if (count($validated) > 0) return $this->returnFail(400, $validated[0]);
        
        try {
            $newUser = User::create([
                'name'          => $request->fullName,
                'email'         => $request->email,
                'password'      => bcrypt($request->password),
                'rol_id'        => 3,
            ]);
        } catch (Exception $th) {
            return $this->returnSuccess(400, $th->getMessage());
        }

        return $this->returnSuccess(200, $newUser);
    }
    public function updateUser(Request $request, $id){
        // $validated = $this->validateFieldsFromInput($request->all()) ;

        // if (count($validated) > 0) return $this->returnFail(400, $validated[0]);
       
        $user = User::find($id);
        if (!$user) return $this->returnFail(400, 'Usuario no encontrado');
        
        try {
            $user->phone    = $request->phone ?? $user->phone;
            $user->city     = $request->city ?? $user->city;
            $user->locality = $request->locality ?? $user->locality;
            $user->address  = $request->address ?? $user->address;
            $user->work     = $request->work ?? $user->work;
            $user->office   = $request->office ?? $user->office;
            $user->salary   = $request->salary ?? $user->salary;

            $user->save();
            
        } catch (Exception $th) {
            return $this->returnSuccess(400, $th->getMessage() );
        }

        return $this->returnSuccess(200, $user);
        

    }
    public function deleteUser($userId)
    {
        if (!$userId) {
            return $this->returnFail(400, "El ID del producto es requerido.");
        }

        $user = User::find($userId);
        // $dismantlingsOfProducts= Dismantling::where('piece_product_id', $userId)->delete();


        if (!$user) {
            return $this->returnFail(404, "Producto no encontrada.");
        }

        $user->delete();


        return $this->returnSuccess(200, ['id' => $userId, 'deleted_at' => $user->deleted_at]);
    }
    public function getUserById($userId){
        $user = User::with('rol', 'orders.client', 'orders.products', 'orders.outOrder')->find($userId);
 
         return $this->returnSuccess(200, $user);
     }
    public function getAlluserByRol(Request $request){
       $usersByRol = User::with('rol')->where('rol',$request->rol)->get();

        return $this->returnSuccess(200, $usersByRol);
    }

    private function validateFieldsFromInput($inputs){
        $rules=[
            'fullName'      => ['required', 'regex:/^[a-zA-Z-À-ÿ .]+$/i'],
            'dni'           => ['required', 'unique:users', 'regex:/^[0-9 .]+$/i'],
            // 'email'         => ['required', 'email',],
            'password'      => ['min:8'],
        ];
        $messages = [
            'fullName.required'     => 'El nombre es requerido.',
            'fullName.regex'        => 'Nombre no valido',
            'dni.required'          => 'El DNI es requerido.',
            'dni.regex'             => 'DNI no valido',
            'dni.unique'            => 'DNI ya se encuentra registrado',
            // 'email.required'        => 'El email es requerido.',
            // 'email.email'           => 'El Email no es valido',
            'password.required'     => 'La contraseña es requerida',
            'password.min'          => 'La contraseña debe tener un minimo de 8 caracteres'
        ];


         $validator = Validator::make($inputs, $rules, $messages)->errors();

        return $validator->all() ;

    }

}
