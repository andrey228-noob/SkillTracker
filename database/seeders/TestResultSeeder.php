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
                // Решаем, будет ли score null (50% вероятность)
                // $score = (rand(0, 1) === 1) ? rand(0, 1) : null;
                $score = null;

                TestResult::firstOrCreate([
                    'test_id' => $test->id,
                    'user_id' => $user->id,
                ], [
                    'score' => $score,
                ]);
            }
        }
    }
}
