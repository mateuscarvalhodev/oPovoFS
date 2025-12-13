<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Auth\AuthenticationException;

class ApiAuthenticate
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user('sanctum')) {
            throw new AuthenticationException('Unauthenticated.');
        }
        return $next($request);
    }
}