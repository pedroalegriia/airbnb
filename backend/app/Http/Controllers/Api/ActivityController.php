<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActivityRequest;
use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use App\Models\Property;
use App\Support\ApiResponse;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    use ApiResponse;

    public function publicByProperty(Property $property)
    {
        return ActivityResource::collection($property->activities()->where('status', 'active')->latest()->get());
    }

    public function index(Request $request)
    {
        abort_unless(in_array($request->user()->role, ['host', 'admin'], true), 403, __('messages.forbidden'));
        $query = Activity::with('property')->latest();
        if ($request->user()->role === 'host') {
            $query->where('host_id', $request->user()->id);
        }
        return ActivityResource::collection($query->paginate(25));
    }

    public function store(ActivityRequest $request)
    {
        $property = Property::findOrFail($request->validated('property_id'));
        abort_if($request->user()->role === 'host' && $property->host_id !== $request->user()->id, 403, __('messages.forbidden'));
        $activity = Activity::create(array_merge($request->validated(), ['host_id' => $property->host_id]));
        return $this->success(new ActivityResource($activity->load('property')), 'messages.activity_created', 201);
    }

    public function update(ActivityRequest $request, Activity $activity)
    {
        abort_if($request->user()->role === 'host' && $activity->host_id !== $request->user()->id, 403, __('messages.forbidden'));
        $property = Property::findOrFail($request->validated('property_id'));
        abort_if($request->user()->role === 'host' && $property->host_id !== $request->user()->id, 403, __('messages.forbidden'));
        $activity->update(array_merge($request->validated(), ['host_id' => $property->host_id]));
        return $this->success(new ActivityResource($activity->load('property')), 'messages.activity_updated');
    }

    public function destroy(Request $request, Activity $activity)
    {
        abort_unless(in_array($request->user()->role, ['host', 'admin'], true), 403, __('messages.forbidden'));
        abort_if($request->user()->role === 'host' && $activity->host_id !== $request->user()->id, 403, __('messages.forbidden'));
        $activity->delete();
        return $this->success(null, 'messages.activity_deleted');
    }
}
