<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminOrVip
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::user() && (Auth::user()->role === 'Admin' || Auth::user()->role === 'VIP korisnik')) {
            return $next($request);
        }

        return response()->json(['message' => 'You have not admin or vip access'], 403);
    }
}
