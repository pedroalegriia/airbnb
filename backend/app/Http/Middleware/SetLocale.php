<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $lang = $request->query('lang') ?: substr((string) $request->header('Accept-Language', ''), 0, 2);
        App::setLocale(in_array($lang, ['es', 'en'], true) ? $lang : config('app.locale', 'es'));

        return $next($request);
    }
}
