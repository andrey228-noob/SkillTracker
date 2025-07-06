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
                'options' => [
                    'question' => 'В каком году началась Вторая мировая война?',
                    'answers' => [
                        ['value' => '1939', 'text' => '1939'],
                        ['value' => '1941', 'text' => '1941'],
                        ['value' => '1914', 'text' => '1914'],
                        ['value' => '1945', 'text' => '1945']
                    ],
                    'correct' => '1939'
                ],
            ],
            [
                'slug' => 'test-4',
                'title' => 'Тест по английскому языку',
                'description' => 'Проверьте свои знания английского языка.',
                'options' => [
                    'question' => 'Как будет "кошка" по-английски?',
                    'answers' => [
                        ['value' => 'dog', 'text' => 'Dog'],
                        ['value' => 'cat', 'text' => 'Cat'],
                        ['value' => 'bird', 'text' => 'Bird'],
                        ['value' => 'fish', 'text' => 'Fish']
                    ],
                    'correct' => 'cat'
                ],
            ],
            [
                'slug' => 'test-5',
                'title' => 'Тест по географии',
                'description' => 'Проверьте свои знания географии.',
                'options' => [
                    'question' => 'Какая самая длинная река в мире?',
                    'answers' => [
                        ['value' => 'nile', 'text' => 'Нил'],
                        ['value' => 'amazon', 'text' => 'Амазонка'],
                        ['value' => 'yangtze', 'text' => 'Янцзы'],
                        ['value' => 'mississippi', 'text' => 'Миссисипи']
                    ],
                    'correct' => 'amazon'
                ],
            ],
            [
                'slug' => 'test-6',
                'title' => 'Тест по физике',
                'description' => 'Проверьте свои знания физики.',
                'options' => [
                    'question' => 'Что такое сила?',
                    'answers' => [
                        ['value' => 'energy', 'text' => 'Энергия'],
                        ['value' => 'mass', 'text' => 'Масса'],
                        ['value' => 'interaction', 'text' => 'Взаимодействие тел'],
                        ['value' => 'speed', 'text' => 'Скорость']
                    ],
                    'correct' => 'interaction'
                ],
            ],
            [
                'slug' => 'test-7',
                'title' => 'Тест по биологии',
                'description' => 'Проверьте свои знания биологии.',
                'options' => [
                    'question' => 'Какой орган отвечает за перекачивание крови в организме?',
                    'answers' => [
                        ['value' => 'lungs', 'text' => 'Легкие'],
                        ['value' => 'heart', 'text' => 'Сердце'],
                        ['value' => 'liver', 'text' => 'Печень'],
                        ['value' => 'kidneys', 'text' => 'Почки']
                    ],
                    'correct' => 'heart'
                ],
            ],
            [
                'slug' => 'test-8',
                'title' => 'Тест по химии',
                'description' => 'Проверьте свои знания химии.',
                'options' => [
                    'question' => 'Какой химический элемент обозначается символом H?',
                    'answers' => [
                        ['value' => 'helium', 'text' => 'Гелий'],
                        ['value' => 'hydrogen', 'text' => 'Водород'],
                        ['value' => 'carbon', 'text' => 'Углерод'],
                        ['value' => 'oxygen', 'text' => 'Кислород']
                    ],
                    'correct' => 'hydrogen'
                ],
            ],
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
