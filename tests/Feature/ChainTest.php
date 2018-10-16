<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ChainTest extends TestCase
{
    /**
     * @test
     * @return void
     */
    public function callingChainWithNoArgumentsReturnsAllActiveChains()
    {
        $user = factory(\App\User::class)->create();

        $response = $this->actingAs($user)
                        ->withSession(['foo' => 'bar'])
                        ->get('/chains');

        $response->assertStatus(200);
        $response->assertExactJson(array('derp' => 'herp'));
    }
}
