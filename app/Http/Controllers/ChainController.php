<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chain;

class ChainController extends Controller
{
    public function index()
    {

        error_log("HERP DERP");

        return json_encode(array("derp" => 'herp'));
    }
}
