<?php
return [
    'name' => env('APP_NAME', 'Rental Marketplace'),
    'env' => env('APP_ENV', 'production'),
    'debug' => (bool) env('APP_DEBUG', false),
    'url' => env('APP_URL', 'http://localhost'),
    'timezone' => 'UTC',
    'locale' => env('APP_LOCALE', 'es'),
    'fallback_locale' => env('APP_FALLBACK_LOCALE', 'en'),
    'faker_locale' => 'es_ES',
    'cipher' => 'AES-256-CBC',
    'key' => env('APP_KEY'),
    'admin_email' => env('ADMIN_EMAIL', 'admin@example.com'),
    'previous_keys' => array_filter(explode(',', env('APP_PREVIOUS_KEYS', ''))),
];
