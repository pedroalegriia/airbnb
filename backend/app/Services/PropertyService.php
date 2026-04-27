<?php
namespace App\Services;
use App\Models\Property;
use App\Models\User;
use App\Repositories\Contracts\AvailabilityRepositoryInterface;
use App\Repositories\Contracts\PropertyRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
class PropertyService
{
    public function __construct(private PropertyRepositoryInterface $properties, private AvailabilityRepositoryInterface $availability) {}
    public function create(User $host, array $data): Property { $data['host_id'] = $host->id; $data['images'] = $this->storeImages($data['images'] ?? []); return $this->properties->create($data); }
    public function update(Property $property, array $data): Property { if (isset($data['images'])) { $data['images'] = array_merge($property->images ?? [], $this->storeImages($data['images'])); } return $this->properties->update($property, $data); }
    public function blockDates(Property $property, array $dates): void { $this->availability->blockDates($property->id, $dates); }
    private function storeImages(array $images): array { return array_map(fn (UploadedFile $file) => Storage::disk(config('filesystems.default'))->putFile('properties', $file, 'public'), $images); }
}
