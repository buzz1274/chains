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
}
