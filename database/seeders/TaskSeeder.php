<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\User;

class TaskSeeder extends Seeder
{
    public function run()
    {
        $workers = User::where('role', 'worker')->get();
        $managers = User::where('role', 'manager')->get();

        foreach ($managers as $manager) {
            foreach ($workers as $worker) {
                Task::firstOrCreate([
                    'user_id' => $worker->id,
                    'manager_id' => $manager->id,
                    'title' => 'Задача для ' . $worker->name,
                    'description' => 'Описание задачи для ' . $worker->name . '. Необходимо выполнить в срок.',
                    'status' => 'pending',
                    'due_date' => now()->addDays(rand(1, 30)), // Случайная дата выполнения
                ]);
            }
        }
    }
}
