<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public static function add($name, $email, $password)
    {
        self::insert(
            [
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password)
            ]
        );

        //send registration email//
    }

    public static function emailAlreadyInUse($email)
    {
        return (bool)self::select(['id'])->
                        where('email', '=', $email)->
                        count();
    }

    public static function passwordMatchesPolicy($password)
    {
        if (strlen($password) < 7) {
            return false;
        }

        if (!preg_match('/[0-9]/', $password)) {
            return false;
        }

        if (!preg_match('/[a-z]/', $password)) {
            return false;
        }

        if (!preg_match('/[A-Z]/', $password)) {
            return false;
        }

        if (!preg_match('/\W/', $password)) {
            return false;
        }

        return true;
    }
}
