<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Test;

class TestSeeder extends Seeder
{
    public function run()
    {
        // Создаем тестовые тесты
        Test::firstOrCreate([
            'title' => 'Тест по программированию',
            'description' => 'Проверьте свои знания в программировании.',
            'slug' => 'programming-test',
            'options' => json_encode([
                'Вариант 1',
                'Вариант 2',
                'Вариант 3',
                'Вариант 4',
            ]),
        ]);

        Test::firstOrCreate([
            'title' => 'Тест по математике',
            'description' => 'Проверьте свои знания в математике.',
            'slug' => 'math-test',
            'options' => json_encode([
                'Вариант A',
                'Вариант B',
                'Вариант C',
                'Вариант D',
            ]),
        ]);
    }
}
