<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    private $user = false;

    public function __construct()
    {
        $this->user = new User();
    }

    /**
     * Register a new user
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $result = $this->user->register(
            [
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => $request->input('password'),
            ]
        );

        if (is_array($result)) {
            return response()->json($result, 400);
        } elseif ($result === true) {
            return response()->json(['Registration successful'], 201);
        }

        return response()->json(['Registration failed'], 500);
    }
}
