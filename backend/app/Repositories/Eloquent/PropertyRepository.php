<?php
namespace App\Repositories\Eloquent;
use App\Models\Property;
use App\Repositories\Contracts\PropertyRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
class PropertyRepository implements PropertyRepositoryInterface
{
    public function search(array $filters): LengthAwarePaginator
    {
        return Property::query()
            ->withAvg('reviews', 'rating')
            ->where('status', 'active')->where('is_blocked', false)
            ->when($filters['city'] ?? null, fn (Builder $q, string $city) => $q->where('city', 'like', "%{$city}%"))
            ->when($filters['guests'] ?? null, fn (Builder $q, int $guests) => $q->where('max_guests', '>=', $guests))
            ->when(($filters['start_date'] ?? null) && ($filters['end_date'] ?? null), function (Builder $q) use ($filters) {
                $q->whereDoesntHave('availability', fn (Builder $a) => $a->whereBetween('date', [$filters['start_date'], date('Y-m-d', strtotime($filters['end_date'].' -1 day'))])->where('is_available', false))
                  ->whereDoesntHave('bookings', fn (Builder $b) => $b->whereIn('status', ['pending', 'confirmed'])->where('start_date', '<', $filters['end_date'])->where('end_date', '>', $filters['start_date'])->where(fn (Builder $x) => $x->where('status', 'confirmed')->orWhere('expires_at', '>', now())));
            })
            ->latest()->paginate(min((int)($filters['per_page'] ?? 12), 50));
    }
    public function findBySlug(string $slug): Property { return Property::with(['reviews.user:id,name'])->where('slug', $slug)->where('status', 'active')->where('is_blocked', false)->firstOrFail(); }
    public function findVisible(int $id): Property { return Property::with(['reviews.user:id,name'])->where('is_blocked', false)->findOrFail($id); }
    public function create(array $data): Property { return Property::create($data); }
    public function update(Property $property, array $data): Property { $property->update($data); return $property->refresh(); }
    public function delete(Property $property): void { $property->delete(); }
    public function lockForBooking(int $propertyId): Property { return Property::whereKey($propertyId)->where('status', 'active')->where('is_blocked', false)->lockForUpdate()->firstOrFail(); }
}
