<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $priorityOptions=['low','medium','high'];
        return [
            'name' => fake()->name(),
            'status' => fake()->boolean(),
            'description' => fake()->paragraph(),
            'start_date' => fake()->date(),
            'end_date' =>fake()->date(),
            'priority'=>fake()->randomElement($priorityOptions),
            'category_id'=>Category::factory()
        ];
    }
}
