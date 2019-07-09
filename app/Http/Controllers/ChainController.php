<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chain;

class ChainController extends Controller
{

    const USER_ID = 2;

    public function chains()
    {

        error_log("HERE");
        error_log(print_r(Chain::chains(self::USER_ID)->toJson(), true));

        return Chain::chains(self::USER_ID)->toJson();
    }
}
