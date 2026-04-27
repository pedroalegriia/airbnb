<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        return [
            'id' => $this->id,
            'host_id' => $this->host_id,
            'property_id' => $this->property_id,
            'title' => $this->{"title_{$locale}"},
            'description' => $this->{"description_{$locale}"},
            'title_es' => $this->title_es,
            'title_en' => $this->title_en,
            'description_es' => $this->description_es,
            'description_en' => $this->description_en,
            'category' => $this->{"category_{$locale}"},
            'category_es' => $this->category_es,
            'category_en' => $this->category_en,
            'price' => $this->price,
            'duration_minutes' => $this->duration_minutes,
            'image_url' => $this->image_url,
            'status' => $this->status,
            'property' => new PropertyResource($this->whenLoaded('property')),
        ];
    }
}
