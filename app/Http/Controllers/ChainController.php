<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chain;

class ChainController extends Controller
{
    const USER_ID = 1;

    public function chains()
    {
        return Chain::chains(self::USER_ID)->toJson();
    }
}
