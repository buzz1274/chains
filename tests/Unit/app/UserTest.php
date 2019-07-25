<?php

namespace Tests\Unit;

use Tests\TestCase;
use Mockery;
use App\User;

class UserTest extends TestCase
{
    /**
     * @test
     */
    public function registerShouldReturnErrorAnErrorsArrayIfNoRegistrationValuesSpecified()
    {
        $user = Mockery::mock(User::class)->makePartial();
        $errors = $user->register([]);

        $this->assertTrue(is_array($errors));
    }

    /**
     * @test
     */
    public function aMissingFieldInRegistrationShouldReturnAnError()
    {
        $user = Mockery::mock(User::class)->makePartial();
        $errors = $user->register(
            [
                'password' => 'pass',
                'repeatPassword' => 'pass',
            ]
        );

        $this->assertTrue(
            $errors['name'] === User::REGISTRATION_ERROR_MISSING_FIELD
        );
    }

    /**
     * @test
     */
    public function ifEmailAddressIsAlreadyInUseAnErrorWillBeReturned()
    {
        $user = Mockery::mock(User::class)
            ->makePartial()
            ->shouldAllowMockingProtectedMethods()
            ->allows(
                ['emailAlreadyInUse' => true]
            );

        $errors = $user->register(
            [
                'name' => 'herp derp',
                'email' => 'herp@derp.com',
                'password' => 'pass',
                'repeatPassword' => 'pass',
            ]
        );

        $this->assertTrue(
            $errors['email'] === User::REGISTRATION_ERROR_EMAIL_IN_USE
        );
    }

    /**
     * @test
     */
    public function ifPasswordsDoNotMatchAnErrorWillBeReturned()
    {
        $user = Mockery::mock(User::class)
            ->makePartial()
            ->shouldAllowMockingProtectedMethods()
            ->allows(
                ['emailAlreadyInUse' => false]
            );

        $errors = $user->register(
            [
                'name' => 'herp derp',
                'email' => 'herp@derp.com',
                'password' => 'pass1',
                'repeatPassword' => 'pass2',
            ]
        );

        $this->assertTrue(
            $errors['password'] === User::REGISTRATION_ERROR_PASSWORDS_DO_NOT_MATCH &&
            $errors['repeatPassword'] === User::REGISTRATION_ERROR_PASSWORDS_DO_NOT_MATCH
        );
    }

    /**
     * @test
     */
    public function ifNoOtherPasswordErrorsAndPasswordDoesNotMatchPolicyAnErrorWillBeRaised()
    {
        $user = Mockery::mock(User::class)
            ->makePartial()
            ->shouldAllowMockingProtectedMethods()
            ->allows(
                [
                    'emailAlreadyInUse' => false,
                    'passwordMatchesPolicy' => false,
                ]
            );

        $errors = $user->register(
            [
                'name' => 'herp derp',
                'email' => 'herp@derp.com',
                'password' => 'pass',
                'repeatPassword' => 'pass',
            ]
        );

        $this->assertTrue(
            $errors['password'] === User::PASSWORD_DOES_NOT_MEET_GUIDELINES &&
            $errors['repeatPassword'] === User::PASSWORD_DOES_NOT_MEET_GUIDELINES
        );
    }

}
