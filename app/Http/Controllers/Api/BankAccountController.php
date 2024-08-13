<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AccountBank;
use App\Models\Bank;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class BankAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getBanks()
    {
        try {
            //code...
            $banks = Bank::where('status', 1)->get();
        } catch (Exception $th) {
            return $this->returnFail(400, $th);
        }

       return $this->returnSuccess(200, $banks);
    }
    public function getAccountsBanksByUser($userId)
    {
        try {
            $accountsBank = AccountBank::with(['bank','user'])->where('user_id', $userId)->get();
        } catch (Exception $th) {
            return $this->returnFail(400, $th);
        }

       return $this->returnSuccess(200, $accountsBank);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeAccountBank(Request $request)
    {
        //
        $user = User::find($request->user);

        try {
            $newAccountBank = AccountBank::create([
                'account_number' => $request->number,
                'account_type' => $request->type,
                'account_owner' => $user->name,
                'account_owner_dni' => $user->dni,
                'user_id' => $user->id,
                'bank_id' => $request->bank,
            ]);
        } catch (Exception $th) {
            return $this->returnFail(400, $th->getMessage());
        }

       return $this->returnSuccess(200, $newAccountBank);

        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateAccountBank(Request $request, string $id)
    {
        $bankAccount = AccountBank::find($id);

        if(!$bankAccount) return $this->returnFail(400, 'Cuenta no existe');
        try {
            $bankAccount->account_number = $request->account_number ?? $bankAccount->account_number ;
            $bankAccount->account_type = $request->account_type ?? $bankAccount->account_type ;
            $bankAccount->save();
        } catch (Exception $th) {
            return $this->returnFail(400, $th->getMessage());
        }

       return $this->returnSuccess(200, $bankAccount);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyAccountBank( string $id)
    {
        $bankAccount = AccountBank::find($id);

        if(!$bankAccount) return $this->returnFail(400, 'Cuenta no existe');
        try {
            $bankAccount->delete();
        } catch (Exception $th) {
            return $this->returnFail(400, $th->getMessage());
        }

       return $this->returnSuccess(200, $bankAccount);
    }
}
