# Rental Marketplace MVP

Production-ready MVP scaffold for an Airbnb-like rental marketplace.

## Stack

- Backend: Laravel API with Sanctum, service/repository pattern, queues, localization ES/EN, UTC dates.
- Frontend: Angular standalone, TailwindCSS, ngx-translate, PWA service worker.

## Critical flows implemented

- Pending bookings expire after 10 minutes via scheduled queued job.
- Double booking prevention uses DB transactions and `SELECT ... FOR UPDATE` locks on properties, availability rows and overlapping bookings.
- Bookings are confirmed only by successful Stripe webhook processing.
- Webhook idempotency uses unique `webhook_event_id` and `external_payment_id`.
- Reviews require a confirmed completed booking and are linked to `booking_id`.
- API localization uses `?lang=es|en` or `Accept-Language`.
- PWA caches static assets; API data uses network-first strategy and booking/payment actions are not designed for offline use.

## Local setup

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
php artisan queue:work
php artisan schedule:work
```

Configure S3 and Stripe variables in `.env` for production-like uploads and payment webhooks.

### Frontend

```bash
cd frontend
npm install
npm start
```

The API base URL is currently `http://localhost:8000/api` in `ApiService` and `AuthService`.
