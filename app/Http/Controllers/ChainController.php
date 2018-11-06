<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chain;

class ChainController extends Controller
{
    public function index()
    {

        return json_encode(array("derp" => 'herp'));
    }
}
