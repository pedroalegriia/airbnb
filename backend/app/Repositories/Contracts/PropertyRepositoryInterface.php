<?php
namespace App\Repositories\Contracts;
use App\Models\Property;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
interface PropertyRepositoryInterface
{
    public function search(array $filters): LengthAwarePaginator;
    public function findVisible(int $id): Property;
    public function findPublicPage(string $slug): Property;
    public function create(array $data): Property;
    public function update(Property $property, array $data): Property;
    public function delete(Property $property): void;
    public function lockForBooking(int $propertyId): Property;
}
