<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TestResult;
use App\Models\User;
use App\Models\Test;

class TestResultSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $tests = Test::all();

        foreach ($users as $user) {
            foreach ($tests as $test) {
                TestResult::firstOrCreate([
                    'test_id' => $test->id,
                    'user_id' => $user->id,
                    'score' => rand(50, 100), // Случайный балл от 50 до 100
                ]);
            }
        }
    }
}
