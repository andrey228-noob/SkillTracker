<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Test;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Запускаем сидеры пользователей и тестов
        $this->call(UserSeeder::class);
        $this->call(TestSeeder::class);

        // Получаем всех работников и тесты
        $workers = User::where('role', 'worker')->get();
        $tests = Test::all();

        // Связываем работников с тестами
        foreach ($workers as $worker) {
            foreach ($tests as $test) {
                $worker->testResults()->firstOrCreate([
                    'test_id' => $test->id,
                    'score' => rand(0, 100), // Генерируем случайный балл
                ]);
            }
        }
    }
}
