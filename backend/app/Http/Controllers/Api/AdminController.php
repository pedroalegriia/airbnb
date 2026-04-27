<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BlockRequest;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\BookingResource;
use App\Http\Resources\PropertyResource;
use App\Http\Resources\UserResource;
use App\Models\Activity;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Property;
use App\Models\Review;
use App\Models\User;
use App\Support\ApiResponse;
class AdminController extends Controller
{
    use ApiResponse;
    private function authorizeAdmin(): void { abort_unless(request()->user()?->role === 'admin', 403, __('messages.forbidden')); }
    public function dashboard()
    {
        $this->authorizeAdmin();
        return $this->success([
            'totals' => [
                'users' => User::count(),
                'hosts' => User::where('role', 'host')->count(),
                'guests' => User::where('role', 'guest')->count(),
                'properties' => Property::count(),
                'activities' => Activity::count(),
                'bookings' => Booking::count(),
                'payments_paid' => Payment::where('status', 'paid')->count(),
                'revenue' => (float) Payment::where('status', 'paid')->sum('amount'),
                'reviews' => Review::count(),
            ],
            'recent' => [
                'users' => UserResource::collection(User::latest()->limit(5)->get()),
                'properties' => PropertyResource::collection(Property::latest()->limit(5)->get()),
                'bookings' => BookingResource::collection(Booking::with(['property', 'payment'])->latest()->limit(5)->get()),
                'activities' => ActivityResource::collection(Activity::with('property')->latest()->limit(5)->get()),
            ],
        ]);
    }
    public function users() { $this->authorizeAdmin(); return UserResource::collection(User::latest()->paginate(25)); }
    public function properties() { $this->authorizeAdmin(); return PropertyResource::collection(Property::latest()->paginate(25)); }
    public function activities() { $this->authorizeAdmin(); return ActivityResource::collection(Activity::with('property')->latest()->paginate(25)); }
    public function blockUser(BlockRequest $request, User $user) { $this->authorizeAdmin(); $user->update($request->validated()); return $this->success(new UserResource($user), 'messages.user_updated'); }
    public function blockProperty(BlockRequest $request, Property $property) { $this->authorizeAdmin(); $property->update($request->validated()); return $this->success(new PropertyResource($property), 'messages.property_updated'); }
}
