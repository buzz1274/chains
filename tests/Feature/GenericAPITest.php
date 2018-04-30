<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GenericAPITest extends TestCase
{
    /**
     * @test
     * @return void
     */
    public function callingAPIWithNoEndpointReturns404()
    {
        $response = $this->get('/');

        $response->assertStatus(404);
    }
}
