<?php

namespace App\Http\Controllers;

use App\Chain;
use App\ChainCompletion;

class OutstandingController extends Controller
{
    const USER_ID = 1;

    public function index()
    {
        return Chain::outstanding(self::USER_ID)->toJson();
    }

    public function complete($id, $action)
    {

        if (!ChainCompletion::chainBelongsToUserAndIsOutstanding(self::USER_ID, $id)) {
            return response()->json(['error', 'Outstanding chain Not Found'], 404);
        }

        if (ChainCompletion::doOlderOutstandingChainsExist($id)) {
            return response()->json(
                ['error', 'Older outstanding chain exists. Confirm that first'],
                403
            );
        }

        //update outstanding chain to be complete
        //if failed reset current_streak to 0
        //if not failed increment current streak by 1

        return response()->json(['Outstanding chain confirmed'], 200);
    }

}
