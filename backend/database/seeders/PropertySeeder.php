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
                'slug' => 'hotel-prueba',
                'business_name' => 'Hotel Prueba Barcelona',
                'logo_url' => 'https://api.dicebear.com/8.x/initials/svg?seed=Hotel%20Prueba',
                'facade_image_url' => 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85',
                'services' => [
                    ['category_es' => 'Comodidades', 'category_en' => 'Amenities', 'items' => ['Wifi', 'Cocina equipada', 'Aire acondicionado']],
                    ['category_es' => 'Trabajo remoto', 'category_en' => 'Remote work', 'items' => ['Escritorio', 'Internet rapido', 'Check-in autonomo']],
                ],
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
                'slug' => 'apartamento-madrid',
                'business_name' => 'Madrid Centro Suites',
                'logo_url' => 'https://api.dicebear.com/8.x/initials/svg?seed=Madrid%20Suites',
                'facade_image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=85',
                'services' => [
                    ['category_es' => 'Ubicacion', 'category_en' => 'Location', 'items' => ['Centro historico', 'Metro cercano', 'Museos']],
                    ['category_es' => 'Estancia', 'category_en' => 'Stay', 'items' => ['Balcon', 'Lavadora', 'Cocina']],
                ],
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
                'slug' => 'villa-cancun',
                'business_name' => 'Villa Mar Cancun',
                'logo_url' => 'https://api.dicebear.com/8.x/initials/svg?seed=Villa%20Mar',
                'facade_image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
                'services' => [
                    ['category_es' => 'Exterior', 'category_en' => 'Outdoor', 'items' => ['Piscina', 'Acceso a playa', 'Terraza']],
                    ['category_es' => 'Familias', 'category_en' => 'Families', 'items' => ['8 huespedes', 'Parrilla', 'Estacionamiento']],
                ],
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
                'slug' => 'cabana-bariloche',
                'business_name' => 'Bosque Sur Cabins',
                'logo_url' => 'https://api.dicebear.com/8.x/initials/svg?seed=Bosque%20Sur',
                'facade_image_url' => 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1400&q=85',
                'services' => [
                    ['category_es' => 'Naturaleza', 'category_en' => 'Nature', 'items' => ['Senderos', 'Vista al bosque', 'Chimenea']],
                    ['category_es' => 'Confort', 'category_en' => 'Comfort', 'items' => ['Calefaccion', 'Cocina', 'Pet friendly']],
                ],
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
                'slug' => 'estudio-valencia',
                'business_name' => 'Valencia Studio',
                'logo_url' => 'https://api.dicebear.com/8.x/initials/svg?seed=Valencia%20Studio',
                'facade_image_url' => 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1400&q=85',
                'services' => [
                    ['category_es' => 'Basicos', 'category_en' => 'Basics', 'items' => ['Wifi', 'Cocina', 'Aire acondicionado']],
                ],
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
