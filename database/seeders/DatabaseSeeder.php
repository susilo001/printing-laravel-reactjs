<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Discount;
use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            AddressSeeder::class,
            PaymentMethodSeeder::class,
            CategorySeeder::class,
            DiscountSeeder::class,
            ProductSeeder::class,
            PriceSeeder::class,
            VariantSeeder::class,
            VariantOptionSeeder::class,
            OrderSeeder::class,
            OrderItemSeeder::class,
            PaymentDetailSeeder::class,
            TestimonialSeeder::class,
        ]);
    }
}
