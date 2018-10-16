<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::any('/chains', 'ChainController@index')->middleware('auth:api');
Route::any('/login', 'ChainController@index')->name('login');

Route::any('/', function (Request $request) {
    return response()->json(['error' => 'Page not found'], 404);
});

Route::middleware('auth:api')->get('api/', function (Request $request) {
    return $request->user();
});
