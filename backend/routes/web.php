<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => config('app.name'),
        'status' => 'ok',
        'message' => 'Rental Marketplace API is running.',
        'documentation' => [
            'health' => url('/up'),
            'properties' => url('/api/properties'),
            'login' => url('/api/auth/login'),
            'register' => url('/api/auth/register'),
        ],
    ]);
});
