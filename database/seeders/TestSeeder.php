<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Test;

class TestSeeder extends Seeder
{
    public function run()
    {
        $tests = [
            [
                'slug' => 'test-1',
                'title' => 'Тест по программированию',
                'description' => 'Проверьте свои знания в программировании.',
                'options' => [
                    'question' => 'Какой язык программирования является статически типизированным?',
                    'answers' => [
                        ['value' => 'python', 'text' => 'Python'],
                        ['value' => 'javascript', 'text' => 'JavaScript'],
                        ['value' => 'typescript', 'text' => 'TypeScript'],
                        ['value' => 'ruby', 'text' => 'Ruby']
                    ],
                    'correct' => 'typescript'
                ],
            ],
            [
                'slug' => 'test-2',
                'title' => 'Тест по математике',
                'description' => 'Проверьте свои математические навыки.',
                'options' => [
                    'question' => 'Чему равно 2 + 2 × 2?',
                    'answers' => [
                        ['value' => '6', 'text' => '6'],
                        ['value' => '8', 'text' => '8'],
                        ['value' => '4', 'text' => '4'],
                        ['value' => '10', 'text' => '10']
                    ],
                    'correct' => '6'
                ],
            ],
            [
                'slug' => 'test-3',
                'title' => 'Тест по истории',
                'description' => 'Проверьте свои знания истории.',
                'options' => json_encode(['option1' => 'Ответ X', 'option2' => 'Ответ Y', 'option3' => 'Ответ Z']),
            ],
            [
                'slug' => 'test-4',
                'title' => 'Тест по английскому языку',
                'description' => 'Проверьте свои знания английского языка.',
                'options' => json_encode(['option1' => 'Ответ I', 'option2' => 'Ответ II', 'option3' => 'Ответ III']),
            ],
            [
                'slug' => 'test-5',
                'title' => 'Тест по географии',
                'description' => 'Проверьте свои знания географии.',
                'options' => json_encode(['option1' => 'Ответ 1', 'option2' => 'Ответ 2', 'option3' => 'Ответ 3']),
            ],
            [
                'slug' => 'test-6',
                'title' => 'Тест по физике',
                'description' => 'Проверьте свои знания физики.',
                'options' => json_encode(['option1' => 'Ответ A', 'option2' => 'Ответ B', 'option3' => 'Ответ C']),
            ],
            [
                'slug' => 'test-7',
                'title' => 'Тест по биологии',
                'description' => 'Проверьте свои знания биологии.',
                'options' => json_encode(['option1' => 'Ответ X', 'option2' => 'Ответ Y', 'option3' => 'Ответ Z']),
            ],
            [
                'slug' => 'test-8',
                'title' => 'Тест по химии',
                'description' => 'Проверьте свои знания химии.',
                'options' => json_encode(['option1' => 'Ответ I', 'option2' => 'Ответ II', 'option3' => 'Ответ III']),
            ],
            // Добавьте больше тестов по необходимости
        ];

        foreach ($tests as $test) {
            Test::firstOrCreate(
                ['slug' => $test['slug']],
                [
                    'title' => $test['title'],
                    'description' => $test['description'],
                    'options' => $test['options'] // Laravel автоматически конвертирует массив в JSON
                ]
            );
        }
    }
}
