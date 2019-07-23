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
        $result = $this->user->add(
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

        /*
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
        */
    }
}
