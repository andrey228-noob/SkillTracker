<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Создаем тестовых пользователей
        User::firstOrCreate([
            'name' => 'Менеджер 1',
            'email' => 'manager1@example.com',
            'password' => bcrypt('password'), // Храните пароли в зашифрованном виде
            'role' => 'manager',
            'gender' => 'male',
            'phone' => '1234567890',
        ]);

        User::firstOrCreate([
            'name' => 'Работник 1',
            'email' => 'worker1@example.com',
            'password' => bcrypt('password'),
            'role' => 'worker',
            'gender' => 'female',
            'phone' => '0987654321',
        ]);

        User::firstOrCreate([
            'name' => 'Работник 2',
            'email' => 'worker2@example.com',
            'password' => bcrypt('password'),
            'role' => 'worker',
            'gender' => 'male',
            'phone' => '1122334455',
        ]);
    }
}
