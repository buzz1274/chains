<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use App\Helper\Email;

class User extends Authenticatable
{
    use Notifiable;

    const REGISTRATION_ERROR_MISSING_FIELD =
        'Please enter a value';

    const REGISTRATION_ERROR_EMAIL_IN_USE =
        'Email address already in use';

    const REGISTRATION_ERROR_PASSWORDS_DO_NOT_MATCH =
        'Passwords do not match';

    const PASSWORD_DOES_NOT_MEET_GUIDELINES =
        'Please enter a password of at least 7 characters with at '.
        'least 1 number, 1 uppercase character and '.
        '1 punctuation character';

    const REQUIRED_FIELDS_FOR_REGISTRATION =
        ['name', 'email', 'password', 'repeatPassword'];

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
     * @param $registrationDetails
     *              - name      string
     *              - email     string
     *              - password  string
     * @return array|bool
     */
    public function register($registrationDetails)
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

            $this->sendRegistrationEmail(
                $registrationDetails['email'],
                []
            );

            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    /**
     * @param $registrationDetails
     *              - name      string
     *              - email     string
     *              - password  string
     * @return array|bool
     */
    private function validRegistrationDetails($registrationDetails)
    {
        $errors = [];

        foreach (self::REQUIRED_FIELDS_FOR_REGISTRATION as $field) {
            if (empty($registrationDetails[$field])) {
                $errors[$field] = self::REGISTRATION_ERROR_MISSING_FIELD;
            }
        }

        if (!isset($errors['email']) &&
            $this->emailAlreadyInUse($registrationDetails['email'])) {
            $errors['email'] = self::REGISTRATION_ERROR_EMAIL_IN_USE;
        }

        if (!isset($errors['password']) && !isset($errors['repeatPassword'])) {
            if ($registrationDetails['password'] !=
                $registrationDetails['repeatPassword']) {
                $errors['password'] =
                    self::REGISTRATION_ERROR_PASSWORDS_DO_NOT_MATCH;
                $errors['repeatPassword'] =
                    self::REGISTRATION_ERROR_PASSWORDS_DO_NOT_MATCH;
            }
        }

        if (!isset($errors['password']) &&
            !$this->passwordMatchesPolicy($registrationDetails['password'])) {
            $errors['password'] =
                self::PASSWORD_DOES_NOT_MEET_GUIDELINES;
            $errors['repeatPassword'] =
                self::PASSWORD_DOES_NOT_MEET_GUIDELINES;
        }


        if (!empty($errors)) {
            return $errors;
        }

        return true;
    }

    /**
     * @param $email    string
     * @param $vars     array
     * @return void
     */
    private function sendRegistrationEmail($email, $vars)
    {
        $emailer = new Email();

        $emailer->send(
            $email,
            'chains.zz50.co.uk Registration',
            'registration_email',
            $vars
        );
    }







    private function emailAlreadyInUse($email)
    {
        return (bool)self::select(['id'])->
                        where('email', '=', $email)->
                        count();
    }

    private function passwordMatchesPolicy($password)
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
