<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ProfileRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller
{
    use ApiResponse;
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());
        $user->sendEmailVerificationNotification();
        return $this->success(['user' => new UserResource($user), 'token' => $user->createToken('api')->plainTextToken], 'messages.registered', 201);
    }
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->validated('email'))->first();
        if (! $user || ! Hash::check($request->validated('password'), $user->password)) { throw ValidationException::withMessages(['email' => __('messages.invalid_credentials')]); }
        if ($user->is_blocked) { throw ValidationException::withMessages(['email' => __('messages.user_blocked')]); }
        return $this->success(['user' => new UserResource($user), 'token' => $user->createToken('api')->plainTextToken], 'messages.logged_in');
    }
    public function profile(ProfileRequest $request)
    {
        $data = array_filter($request->validated(), fn ($v) => $v !== null);
        $request->user()->update($data);
        return $this->success(new UserResource($request->user()->refresh()), 'messages.profile_updated');
    }
    public function me() { return $this->success(new UserResource(request()->user())); }
    public function logout() { request()->user()->currentAccessToken()?->delete(); return $this->success(null, 'messages.logged_out'); }
}
