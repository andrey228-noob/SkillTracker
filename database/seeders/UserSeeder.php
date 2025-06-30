<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        $users = [
            [
                'name' => 'admin',
                'email' => 'admin@example.com',
                'password' => bcrypt('admin'),
                'role' => 'admin',
                'gender' => 'male',
                'phone' => '1234567890',
            ],
            [
                'name' => 'Менеджер 1',
                'email' => 'manager1@example.com',
                'password' => bcrypt('password'),
                'role' => 'manager',
                'gender' => 'female',
                'phone' => '0987654321',
            ],
            [
                'name' => 'Менеджер 2',
                'email' => 'manager2@example.com',
                'password' => bcrypt('password'),
                'role' => 'manager',
                'gender' => 'male',
                'phone' => '0987654322',
            ],
            [
                'name' => 'Работник 1',
                'email' => 'worker1@example.com',
                'password' => bcrypt('password'),
                'role' => 'worker',
                'gender' => 'male',
                'phone' => '1122354455',
            ],
            [
                'name' => 'Работник 2',
                'email' => 'worker2@example.com',
                'password' => bcrypt('password'),
                'role' => 'worker',
                'gender' => 'female',
                'phone' => '1122364455',
            ],
            [
                'name' => 'Работник 3',
                'email' => 'worker3@example.com',
                'password' => bcrypt('password'),
                'role' => 'worker',
                'gender' => 'male',
                'phone' => '1122374455',
            ],
            [
                'name' => 'Работник 4',
                'email' => 'worker4@example.com',
                'password' => bcrypt('password'),
                'role' => 'worker',
                'gender' => 'female',
                'phone' => '1122384455',
            ],
            [
                'name' => 'Работник 5',
                'email' => 'worker5@example.com',
                'password' => bcrypt('password'),
                'role' => 'worker',
                'gender' => 'male',
                'phone' => '1122394455',
            ],
            // Добавьте больше пользователей по необходимости
        ];

        foreach ($users as $user) {
            User::firstOrCreate($user);
        }
    }
}
