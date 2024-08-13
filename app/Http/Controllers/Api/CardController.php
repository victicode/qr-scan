<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use Exception;
use Illuminate\Http\Request;

class CardController extends Controller
{
    //
    public function getLinkCard($id) {

        $card = Card::query()->where('user_id', $id)->first();

        return $this->returnSuccess(200, $card);

    }
    public function linkCard(Request $request) {
        try {
            $card = Card::create([
                'number'     => $request->card,
                'due_date'   => $request->due_date,
                'owner_name' => $request->user()->name,
                'cvc'        => $request->cvc,
                'type'       => $request->type['value'],
                'status'     => 1,
                'user_id'    => $request->user()->id,
            ]);
        } catch (Exception $th) {
            //throw $th;
            return $this->returnFail(505, $th->getMessage());
        }
        
        return $this->returnSuccess(200, $card);
    }
    public function deleteCard($id) {
        $card = Card::find($id);

        if(!$card) return $this->returnFail(404, 'No se encontro la tarjeta');

        $card->delete();

        return $this->returnSuccess(200, $card);
    }
}
