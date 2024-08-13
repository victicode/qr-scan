<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Pay;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class PayController extends Controller
{
    //
    public function storePay(Request $request) {


        $validated = $this->validateFieldsFromInput($request->all()) ;

        if (count($validated) > 0) return $this->returnFail(400, $validated[0]);

        $vaucher = ''; 
        
        if ($request->vaucher) {
            $vaucher = 'public/images/vaucher/' . trim(str_replace(' ', '_', $request->title )) .'.'. $request->File('vaucher')->extension();
            $request->file('vaucher')->move(public_path() . '/images/vaucher/', $vaucher);
        }
        
        try {
            $pay = Pay::create([
                'user_id'       =>  $request->user()->id,
                'loan_id'       =>  $request->loan_id,
                'amount'        =>  $request->amount,
                'operation_id'  =>  $request->operation_id ?? rand(1000000, 9999999),
                'bank'          =>  $request->bank ?? null,
                'pay_date'      =>  $request->pay_date ?? null,
                'vaucher'       =>  $vaucher ?? null,
                'type'          =>  $request->type,
                'status'        =>  $request->status,
                'concept'       =>  $request->concept ?? null,
            ]);
        } catch (Exception $th) {
            return $this->returnFail(400, $th->getMessage());
        }
        
        return $this->returnSuccess(200, $pay);
    }
    public function payRequest(Request $request) {
        $data = [
            "amount" => $request->amount,
            "description" => "cuotatest",
            "periodicity" => 1,
            "debit_day" => $request->debitDay,
            "unlimited" => true
        ];
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Basic YXBwcy91Q2dwaFFRMXNRUFk4dlFoRHZwc1V5R09BQU1MTTBiVDp5KW80UHJqLnpjV1VERmUuNHE2MDUrWVNMR3JCc2ozWk1lQXJPbnhl',
                'Content-Type' => 'application/json'
            ])->post('https://comercios.bancard.com.py:8888/external-commerce/api/0.1/commerces/321473/branches/1/links/generate-payment-link', $data);
        } catch (Exception $th) {
            //throw $th;
            return $this->returnFail(400, $th->getMessage());
        }
        
        return $this->returnSuccess(200, $response->object());
    }
    private function validateFieldsFromInput($inputs){
        $rules=[
            'loan_id'       => ['required', 'integer'],
            'amount'        => ['required', 'integer'],
            'operation_id'  => ['regex:/^[0-9]+$/i'],
            'bank'          => ['regex:/^[a-zA-Z-À-ÿ0-9 .]+$/i'],
            'pay_date'      => ['date'],
            'type'          => ['required', 'integer'],
            'status'        => ['required', 'integer'],
            'concept'       => ['regex:/^[a-zA-Z-À-ÿ0-9 \/.]+$/i'],

        ];
        $messages = [
            'loan_id.required'       => 'El prestamo es requerido.',
            'loan_id.integer'        => 'Prestamo no valido.',
            'amount.required'        => 'El monto es requerido.',
            'amount.integer'         => 'Monto no valido.',
            'operation_id.integer'   => 'Número de operación no valido.',
            'bank.regex'             => 'Banco no valido.',
            'pay_date.date'          => 'Fecha de pago no valida.',
            'type.required'          => 'tipo es requerido.',
            'type.integer'           => 'tipo no valido.',
            'status.required'        => 'Estatus es requerido.',
            'status.integer'         => 'Estatus no valido.',
            'concept.regex'          => 'Concepto no valido.',
        ];


         $validator = Validator::make($inputs, $rules, $messages)->errors();

        return $validator->all() ;

    }
}
