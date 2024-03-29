<?php

namespace Database\Seeders;

use App\Models\Price;
use App\Models\Product;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();

        foreach ($products as $product) {
            Price::factory()->count(6)->forEachSequence(
                ['min_order' => 1, 'max_order' => 10, 'price' => fake()->numberBetween(5000, 6000)],
                ['min_order' => 11, 'max_order' => 50, 'price' => fake()->numberBetween(4000, 5000)],
                ['min_order' => 51, 'max_order' => 100, 'price' => fake()->numberBetween(3000, 4000)],
                ['min_order' => 101, 'max_order' => 300, 'price' => fake()->numberBetween(2000, 3000)],
                ['min_order' => 301, 'max_order' => 500, 'price' => fake()->numberBetween(1000, 2000)],
                ['min_order' => 501, 'max_order' => 1000, 'price' => fake()->numberBetween(500, 1000)],
            )->create([
                'product_id' => $product->id,
            ]);
        }
    }
}
