<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
        error_log($request->input('name'));
        error_log($request->input('email'));
        error_log($request->input('password'));
        error_log($request->input('repeat_password'));
        error_log("HERE");
    }
}
