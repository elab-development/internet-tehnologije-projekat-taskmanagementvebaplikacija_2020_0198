<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

       
        return [
            'name' => fake()->name(),
            'status' => fake()->boolean(),
            'description' => fake()->paragraph(),
            'project_id' => Project::factory(),
            'user_id'=>User::factory()
        ];
    }
}
