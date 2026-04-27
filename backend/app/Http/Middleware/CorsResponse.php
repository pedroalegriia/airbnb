<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsResponse
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->getMethod() === 'OPTIONS') {
            return $this->withCorsHeaders(response('', 204), $request);
        }

        return $this->withCorsHeaders($next($request), $request);
    }

    private function withCorsHeaders(Response $response, Request $request): Response
    {
        $origin = $request->headers->get('Origin');
        $allowedOrigins = config('cors.allowed_origins', []);
        $allowedPatterns = config('cors.allowed_origins_patterns', []);

        if ($origin && ($this->originAllowed($origin, $allowedOrigins) || $this->originMatchesPattern($origin, $allowedPatterns))) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Vary', 'Origin', false);
        }

        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Accept-Language');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Max-Age', '86400');

        return $response;
    }

    private function originAllowed(string $origin, array $allowedOrigins): bool
    {
        return in_array($origin, $allowedOrigins, true);
    }

    private function originMatchesPattern(string $origin, array $patterns): bool
    {
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $origin) === 1) {
                return true;
            }
        }

        return false;
    }
}
