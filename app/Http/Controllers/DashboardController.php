<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Task;
use App\Models\Test;
use App\Models\TestResult;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Отображает дашборд с соответствующей статистикой в зависимости от роли пользователя
     */
    public function index()
    {
        $stats = [];
        $user = Auth::user();

        if ($user->role === 'admin') {
            // Статистика для администратора
            $stats = [
                'workers_count' => User::where('role', 'worker')->count(),
                'managers_count' => User::where('role', 'manager')->count(),
                'tasks_count' => Task::count(),
                'completed_tasks_count' => Task::where('status', 'completed')->count(),
                'pending_tasks_count' => Task::where('status', 'pending')->count(),
                'tests_count' => Test::count(),
                'test_results_count' => TestResult::count(),
            ];
        } elseif ($user->role === 'manager') {
            // Статистика для менеджера
            $stats = [
                'workers_count' => User::where('role', 'worker')->count(),
                'tasks_count' => Task::where('manager_id', $user->id)->count(),
                'completed_tasks_count' => Task::where('manager_id', $user->id)
                    ->where('status', 'completed')
                    ->count(),
                'pending_tasks_count' => Task::where('manager_id', $user->id)
                    ->where('status', 'pending')
                    ->count(),
            ];
        } else {
            // Статистика для работника
            $stats = [
                'tasks_count' => Task::where('user_id', $user->id)->count(),
                'completed_tasks_count' => Task::where('user_id', $user->id)
                    ->where('status', 'completed')
                    ->count(),
                'pending_tasks_count' => Task::where('user_id', $user->id)
                    ->where('status', 'pending')
                    ->count(),
                'tests_count' => Test::count(),
                'completed_tests_count' => TestResult::where('user_id', $user->id)->count(),
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => $stats
        ]);
    }
}