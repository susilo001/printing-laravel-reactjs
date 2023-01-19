<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RedirectIfAuthenticateTest extends TestCase
{

    /**
     * Test if user already logged in, redirect to home page
     * 
     * @return void
     */
    public function testRedirectIfAuthenticate()
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $this->assertAuthenticated();

        $response->assertRedirect(RouteServiceProvider::HOME);

        $this->actingAs($user)
            ->get('/login')
            ->assertRedirect(RouteServiceProvider::HOME);
    }
}
