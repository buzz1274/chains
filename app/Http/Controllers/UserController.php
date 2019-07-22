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

        if (!isset($errors['email']) &&
            User::emailAlreadyInUse($request->input('email'))) {
            $errors['email'] = 'Email address already in use';
        }

        if (!isset($errors['password']) && !isset($errors['repeatPassword'])) {
            if ($request->input('password') !=
                $request->input('repeatPassword')) {
                $errors['password'] = 'Passwords do not match';
                $errors['repeatPassword'] = $errors['password'];
            }

            if (!isset($errors['password']) &&
                !User::passwordMatchesPolicy($request->input('password'))) {
                $errors['password'] =
                    'Please enter a password of at least 7 characters with at '.
                    'least 1 number, 1 uppercase character and '.
                    '1 punctuation character';
                $errors['repeatPassword'] = $errors['password'];
            }
        }

        if ($errors) {
            return response()->json($errors, 400);
        }

        User::add(
            $request->input('name'),
            $request->input('email'),
            $request->input('password')
        );

        return response()->json(['Registration successful'], 201);
    }
}
