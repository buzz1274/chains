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
        $response = [
            ['id' => 1, 'outstanding' => 'Have you read for ~30 minutes today?', 'active' => true],
            ['id' => 2, 'outstanding' => 'Have you Study French Duolingo(~15 minutes)?', 'active' => true],
            ['id' => 3, 'outstanding' => 'Have you ran 35Km this week?', 'active' => true]
        ];

        return json_encode($response);
    }

}
