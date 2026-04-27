<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Property;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            'hotel-prueba' => [
                ['title_es' => 'Tour gastronomico local', 'title_en' => 'Local food tour', 'description_es' => 'Recorrido por bares y mercados cercanos con guia local.', 'description_en' => 'Walk through nearby bars and markets with a local guide.', 'category_es' => 'Experiencias', 'category_en' => 'Experiences', 'price' => 45, 'duration_minutes' => 180, 'image_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85'],
                ['title_es' => 'Traslado al aeropuerto', 'title_en' => 'Airport transfer', 'description_es' => 'Servicio privado desde o hacia el aeropuerto.', 'description_en' => 'Private service from or to the airport.', 'category_es' => 'Transporte', 'category_en' => 'Transport', 'price' => 35, 'duration_minutes' => 45, 'image_url' => 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=85'],
            ],
            'villa-cancun' => [
                ['title_es' => 'Paseo en catamaran', 'title_en' => 'Catamaran trip', 'description_es' => 'Salida privada al atardecer con bebidas incluidas.', 'description_en' => 'Private sunset trip with drinks included.', 'category_es' => 'Acuaticas', 'category_en' => 'Water activities', 'price' => 120, 'duration_minutes' => 240, 'image_url' => 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85'],
            ],
        ];

        foreach ($items as $slug => $activities) {
            $property = Property::where('slug', $slug)->first();
            if (! $property) {
                continue;
            }

            foreach ($activities as $activity) {
                Activity::updateOrCreate(
                    ['property_id' => $property->id, 'title_en' => $activity['title_en']],
                    array_merge($activity, ['host_id' => $property->host_id, 'property_id' => $property->id, 'status' => 'active'])
                );
            }
        }
    }
}
