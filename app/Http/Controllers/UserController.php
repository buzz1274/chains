<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $errors = false;

        foreach (['name', 'email', 'password', 'repeatPassword'] as $field) {
            if (empty($request->input($field))) {
                $errors[$field] = 'Please enter a value';
            }
        }

        if ($errors) {
            return response()->json($errors, 400);
        }

        if ($request->input('password') !=
            $request->input('repeatPassword')) {
            return response()->json(
                ['password' => 'Passwords do not match',
                 'repeatPassword' => 'Passwords do not match'],
                400
            );
        }

        if (User::emailAlreadyInUse($request->input('email'))) {
            return response()->json(
                ['email' => 'Email address already in use'],
                400
            );
        }

        if (!User::passwordMatchesPolicy($request->input('password'))) {
            //
        }


        return response()->json(['Registration successful'], 201);

        //validate that password matches policy

        //write user details to db
        //send registration email
    }
}
