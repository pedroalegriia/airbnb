<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        $lucia = User::where('email', 'lucia.host@example.com')->firstOrFail();
        $miguel = User::where('email', 'miguel.host@example.com')->firstOrFail();
        $admin = User::where('email', 'admin@example.com')->firstOrFail();

        $properties = [
            [
                'host_id' => $lucia->id,
                'title_es' => 'Loft luminoso en Barcelona',
                'title_en' => 'Bright loft in Barcelona',
                'description_es' => 'Loft moderno cerca de cafes, metro y restaurantes. Ideal para parejas o trabajo remoto.',
                'description_en' => 'Modern loft near cafes, metro and restaurants. Ideal for couples or remote work.',
                'price_per_night' => 145,
                'cleaning_fee' => 35,
                'max_guests' => 3,
                'city' => 'Barcelona',
                'country' => 'Spain',
                'lat' => 41.3851,
                'lng' => 2.1734,
                'status' => 'active',
                'images' => ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85'],
            ],
            [
                'host_id' => $lucia->id,
                'title_es' => 'Apartamento historico en Madrid',
                'title_en' => 'Historic apartment in Madrid',
                'description_es' => 'Piso con balcon en una calle tranquila, a pocos minutos de museos y vida nocturna.',
                'description_en' => 'Apartment with balcony on a quiet street, minutes from museums and nightlife.',
                'price_per_night' => 120,
                'cleaning_fee' => 28,
                'max_guests' => 4,
                'city' => 'Madrid',
                'country' => 'Spain',
                'lat' => 40.4168,
                'lng' => -3.7038,
                'status' => 'active',
                'images' => ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85'],
            ],
            [
                'host_id' => $miguel->id,
                'title_es' => 'Villa frente al mar en Cancun',
                'title_en' => 'Oceanfront villa in Cancun',
                'description_es' => 'Casa amplia con piscina, cocina equipada y acceso directo a la playa.',
                'description_en' => 'Spacious home with pool, equipped kitchen and direct beach access.',
                'price_per_night' => 310,
                'cleaning_fee' => 65,
                'max_guests' => 8,
                'city' => 'Cancun',
                'country' => 'Mexico',
                'lat' => 21.1619,
                'lng' => -86.8515,
                'status' => 'active',
                'images' => ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85'],
            ],
            [
                'host_id' => $miguel->id,
                'title_es' => 'Cabana de montana en Bariloche',
                'title_en' => 'Mountain cabin in Bariloche',
                'description_es' => 'Cabana calida rodeada de bosque, perfecta para desconectar y caminar.',
                'description_en' => 'Warm cabin surrounded by forest, perfect to disconnect and hike.',
                'price_per_night' => 95,
                'cleaning_fee' => 20,
                'max_guests' => 5,
                'city' => 'Bariloche',
                'country' => 'Argentina',
                'lat' => -41.1335,
                'lng' => -71.3103,
                'status' => 'active',
                'images' => ['https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85'],
            ],
            [
                'host_id' => $admin->id,
                'title_es' => 'Estudio pausado en Valencia',
                'title_en' => 'Paused studio in Valencia',
                'description_es' => 'Propiedad de ejemplo pausada para probar filtros de disponibilidad.',
                'description_en' => 'Paused sample property to test availability filters.',
                'price_per_night' => 80,
                'cleaning_fee' => 15,
                'max_guests' => 2,
                'city' => 'Valencia',
                'country' => 'Spain',
                'lat' => 39.4699,
                'lng' => -0.3763,
                'status' => 'paused',
                'images' => ['https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85'],
            ],
        ];

        foreach ($properties as $property) {
            Property::updateOrCreate(
                ['title_en' => $property['title_en']],
                array_merge($property, ['is_blocked' => false])
            );
        }
    }
}
