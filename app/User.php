<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use App\Helper\Email;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * instance of email class
     *
     * @var object
     */
    private $email = false;

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

    /**
     * User constructor.
     */
    public function __construct()
    {
        $this->email = new Email();
    }

    /**
     * @param $registrationDetails
     *              - name      string
     *              - email     string
     *              - password  string
     * @return bool|mixed
     */
    public function add($registrationDetails)
    {
        try {
            $errors = $this->validRegistrationDetails($registrationDetails);

            if (is_array($errors)) {
                return $errors;
            }

            $this->insert(
                [
                    'name' => $registrationDetails['name'],
                    'email' => $registrationDetails['email'],
                    'password' => Hash::make($registrationDetails['password'])
                ]
            );

            $this->sendRegistrationEmail($registrationDetails['email'], []);

            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    private function validRegistrationDetails($registrationDetails)
    {
        $errors = [];

        foreach (['name', 'email', 'password', 'repeatPassword'] as $field) {
            if (empty($registrationDetails[$field])) {
                $errors[$field] = 'Please enter a value';
            }
        }

        if (!isset($errors['email']) &&
            $this->emailAlreadyInUse($registrationDetails['email'])) {
            $errors['email'] = 'Email address already in use';
        }

        if (!isset($errors['password']) && !isset($errors['repeatPassword'])) {
            if ($registrationDetails['password'] !=
                $registrationDetails['repeatPassword']) {
                $errors['password'] = 'Passwords do not match';
                $errors['repeatPassword'] = $errors['password'];
            }

            if (!isset($errors['password']) &&
                !$this->passwordMatchesPolicy(
                    $registrationDetails['password']
                )) {
                $errors['password'] =
                    'Please enter a password of at least 7 characters with at '.
                    'least 1 number, 1 uppercase character and '.
                    '1 punctuation character';
                $errors['repeatPassword'] = $errors['password'];
            }
        }

        if (!empty($errors)) {
            return $errors;
        }

        return true;
    }

    private function sendRegistrationEmail($email, $vars)
    {
        $this->email->send(
            $email,
            'chains.zz50.co.uk Registration',
            'registration_email',
            $vars
        );
    }







    public function emailAlreadyInUse($email)
    {
        return (bool)self::select(['id'])->
                        where('email', '=', $email)->
                        count();
    }

    public function passwordMatchesPolicy($password)
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
