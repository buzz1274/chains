<?php

use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');

Artisan::command('custom:cq', function () {
    passthru('./vendor/bin/phpcs');
    passthru('npm run lint');
    passthru('./vendor/bin/phpunit');
})->describe('Check php & javascript coding standards');

Artisan::command('custom:cq', function () {
    passthru('./vendor/bin/phpcs');
})->describe('Update chain completion table with outstanding chains');
