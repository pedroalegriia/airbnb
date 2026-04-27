<?php

namespace App\Providers;

use App\Repositories\Contracts\AvailabilityRepositoryInterface;
use App\Repositories\Contracts\BookingRepositoryInterface;
use App\Repositories\Contracts\PaymentRepositoryInterface;
use App\Repositories\Contracts\PropertyRepositoryInterface;
use App\Repositories\Eloquent\AvailabilityRepository;
use App\Repositories\Eloquent\BookingRepository;
use App\Repositories\Eloquent\PaymentRepository;
use App\Repositories\Eloquent\PropertyRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(PropertyRepositoryInterface::class, PropertyRepository::class);
        $this->app->bind(AvailabilityRepositoryInterface::class, AvailabilityRepository::class);
        $this->app->bind(BookingRepositoryInterface::class, BookingRepository::class);
        $this->app->bind(PaymentRepositoryInterface::class, PaymentRepository::class);
    }

    public function boot(): void
    {
        date_default_timezone_set('UTC');
    }
}
