<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\BookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Repositories\Contracts\BookingRepositoryInterface;
use App\Services\BookingService;
use App\Support\ApiResponse;
class BookingController extends Controller
{
    use ApiResponse;
    public function __construct(private BookingService $service, private BookingRepositoryInterface $bookings) {}
    public function index() { return BookingResource::collection($this->bookings->userBookings(request()->user()->id)); }
    public function store(BookingRequest $request) { return $this->success(new BookingResource($this->service->createPending($request->user(), $request->validated())), 'messages.booking_created', 201); }
    public function cancel(Booking $booking) { return $this->success(new BookingResource($this->service->cancel($booking, request()->user())), 'messages.booking_cancelled'); }
}
