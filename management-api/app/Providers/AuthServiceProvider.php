<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('isAdmin', function ($user) {
            return $user->role === 'Admin';
        });

        Gate::define('isVip', function ($user) {
            return $user->role === 'Vip korisnik';
        });

        Gate::define('isKorisnik', function ($user) {
            return $user->role === 'Korisnik';
        });

        if (Gate::allows('isAdmin')) {
            //mozes da menjas role kod usera 
            
        }
    }
}
