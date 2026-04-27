<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::post('/payments/stripe/webhook', [PaymentController::class, 'stripeWebhook']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'profile']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request): JsonResponse {
        $request->fulfill();
        return response()->json(['message' => __('messages.email_verified')]);
    })->middleware(['signed'])->name('verification.verify');
    Route::post('/email/verification-notification', function (Request $request): JsonResponse {
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => __('messages.verification_sent')]);
    })->middleware('throttle:6,1')->name('verification.send');

    Route::middleware('verified')->group(function () {
        Route::apiResource('/properties', PropertyController::class)->except(['index','show']);
        Route::post('/properties/{property}/availability/block', [PropertyController::class, 'blockDates']);
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::post('/bookings/{booking}/cancel', [BookingController::class, 'cancel']);
        Route::post('/payments/{payment}/intent', [PaymentController::class, 'intent']);
        Route::post('/reviews', [ReviewController::class, 'store']);
        Route::get('/admin/users', [AdminController::class, 'users']);
        Route::get('/admin/properties', [AdminController::class, 'properties']);
        Route::patch('/admin/users/{user}/block', [AdminController::class, 'blockUser']);
        Route::patch('/admin/properties/{property}/block', [AdminController::class, 'blockProperty']);
    });
});
