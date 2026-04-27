<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BlockRequest;
use App\Http\Resources\PropertyResource;
use App\Http\Resources\UserResource;
use App\Models\Property;
use App\Models\User;
use App\Support\ApiResponse;
class AdminController extends Controller
{
    use ApiResponse;
    private function authorizeAdmin(): void { abort_unless(request()->user()?->email === config('app.admin_email'), 403, __('messages.forbidden')); }
    public function users() { $this->authorizeAdmin(); return UserResource::collection(User::latest()->paginate(25)); }
    public function properties() { $this->authorizeAdmin(); return PropertyResource::collection(Property::latest()->paginate(25)); }
    public function blockUser(BlockRequest $request, User $user) { $this->authorizeAdmin(); $user->update($request->validated()); return $this->success(new UserResource($user), 'messages.user_updated'); }
    public function blockProperty(BlockRequest $request, Property $property) { $this->authorizeAdmin(); $property->update($request->validated()); return $this->success(new PropertyResource($property), 'messages.property_updated'); }
}
