<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Property\AvailabilityRequest;
use App\Http\Requests\Property\PropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use App\Repositories\Contracts\PropertyRepositoryInterface;
use App\Services\PropertyService;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
class PropertyController extends Controller
{
    use ApiResponse;
    public function __construct(private PropertyRepositoryInterface $properties, private PropertyService $service) {}
    public function index(Request $request) { return PropertyResource::collection($this->properties->search($request->only(['city','guests','start_date','end_date','per_page']))); }
    public function show(int $id) { return $this->success(new PropertyResource($this->properties->findVisible($id))); }
    public function store(PropertyRequest $request) { return $this->success(new PropertyResource($this->service->create($request->user(), $request->validated())), 'messages.property_created', 201); }
    public function update(PropertyRequest $request, Property $property) { $this->authorizeHost($property); return $this->success(new PropertyResource($this->service->update($property, $request->validated())), 'messages.property_updated'); }
    public function destroy(Property $property) { $this->authorizeHost($property); $this->properties->delete($property); return $this->success(null, 'messages.property_deleted'); }
    public function blockDates(AvailabilityRequest $request, Property $property) { $this->authorizeHost($property); $this->service->blockDates($property, $request->validated('dates')); return $this->success(null, 'messages.dates_blocked'); }
    private function authorizeHost(Property $property): void { abort_if($property->host_id !== request()->user()->id, 403, __('messages.forbidden')); }
}
