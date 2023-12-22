<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Category::truncate();
        Project::truncate();
        User::truncate();
        Task::truncate();
        //Project::factory(10)->create();

        
        Task::factory(5)->create();

        //zadaci vezani za istog usera
        $user=User::factory()->create();
        $project1=Project::factory()->create();
        $project2=Project::factory()->create();

        Task::factory(2)->create([
            'user_id'=>$user->id,
            'project_id'=>$project1->id,
        ]);

        Task::factory(3)->create([
            'user_id'=>$user->id,
            'project_id'=>$project2->id,
        ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
