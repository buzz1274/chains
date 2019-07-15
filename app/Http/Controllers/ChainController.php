<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chain;

class ChainController extends Controller
{
    const USER_ID = 2;

    public function chains()
    {
        return Chain::chains(self::USER_ID)->toJson();
    }

    public function outstanding()
    {
        return Chain::outstanding(self::USER_ID)->toJson();
    }
}
