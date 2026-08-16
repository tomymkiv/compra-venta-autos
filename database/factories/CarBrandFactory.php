<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CarBrandFactory extends Factory
{
    protected $brands = [
        'Ford',
        'Chevrolet',
        'Maserati',
        'Fiat',
        'Dodge',
        'Volkswagen',
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'marca' => fake()->$this->brands,
        ];  
    }
}
