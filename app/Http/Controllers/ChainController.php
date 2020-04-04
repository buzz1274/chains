<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chain;
use App\ChainCompletion;

class ChainController extends Controller
{
    const USER_ID = 1;

    public function chains()
    {
        return Chain::chains(self::USER_ID)->toJson();
    }

    public function outstandingChains()
    {
        return Chain::outstanding(self::USER_ID)->toJson();
    }

    public function points()
    {
        return response()->json([
            'points' => Chain::points(self::USER_ID),
        ]);
    }

    public function outstandingChainComplete($id, $action)
    {
        if (!ChainCompletion::chainBelongsToUserAndIsOutstanding(     self::USER_ID, $id)) {
            return response()->json(
                ['error', 'Outstanding chain Not Found'],
                404
            );
        }

        if (ChainCompletion::doOlderOutstandingChainsExist($id)) {
            return response()->json(
                ['error', 'Older outstanding chain exists. Confirm those first'],
                403
            );
        }

        ChainCompletion::completeChain($id, $action);

        return response()->json(['Outstanding chain confirmed'], 200);
    }
}
