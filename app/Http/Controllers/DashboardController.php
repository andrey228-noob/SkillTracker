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
        $tasks = [];

        if ($user->role === 'admin') {
            // Статистика для администратора
            $stats = [
                'workers_count' => User::where('role', 'worker')->count(),
                'managers_count' => User::where('role', 'manager')->count(),
                'tasks_count' => Task::count(),
                'completed_tasks_count' => Task::where('status', 'completed')->count(),
                'pending_tasks_count' => Task::where('status', 'pending')->count(),
                'in_progress_tasks_count' => Task::where('status', 'in_progress')->count(),
                'rejected_tasks_count' => Task::where('status', 'rejected')->count(),
                'tests_count' => Test::count(),
                'test_results_count' => TestResult::count(),
                'completion_rate' => Task::count() > 0 ? round((Task::where('status', 'completed')->count() / Task::count()) * 100) : 0,
            ];
            
            // Все задачи для администратора
            $tasks = Task::with(['user:id,name', 'manager:id,name'])
                ->orderBy('created_at', 'desc')
                ->get();
                
        } elseif ($user->role === 'manager') {
            // Статистика для менеджера
            $managerTasks = Task::where('manager_id', $user->id);
            $totalTasks = $managerTasks->count() ?: 1; // Избегаем деления на ноль
            $completedTasks = $managerTasks->where('status', 'completed')->count();
            
            $stats = [
                'workers_count' => User::where('role', 'worker')->count(),
                'tasks_count' => $totalTasks,
                'completed_tasks_count' => $completedTasks,
                'pending_tasks_count' => Task::where('manager_id', $user->id)
                    ->where('status', 'pending')
                    ->count(),
                'in_progress_tasks_count' => Task::where('manager_id', $user->id)
                    ->where('status', 'in_progress')
                    ->count(),
                'rejected_tasks_count' => Task::where('manager_id', $user->id)
                    ->where('status', 'rejected')
                    ->count(),
                'completion_rate' => round(($completedTasks / $totalTasks) * 100),
            ];
            
            // Задачи, назначенные менеджером
            $tasks = Task::where('manager_id', $user->id)
                ->with(['user:id,name'])
                ->orderBy('created_at', 'desc')
                ->get();
                
        } else {
            // Статистика для работника
            $workerTasks = Task::where('user_id', $user->id);
            $totalTasks = $workerTasks->count() ?: 1; // Избегаем деления на ноль
            $completedTasks = $workerTasks->where('status', 'completed')->count();
            
            $stats = [
                'tasks_count' => $totalTasks,
                'completed_tasks_count' => $completedTasks,
                'pending_tasks_count' => Task::where('user_id', $user->id)
                    ->where('status', 'pending')
                    ->count(),
                'in_progress_tasks_count' => Task::where('user_id', $user->id)
                    ->where('status', 'in_progress')
                    ->count(),
                'rejected_tasks_count' => Task::where('user_id', $user->id)
                    ->where('status', 'rejected')
                    ->count(),
                'tests_count' => Test::count(),
                'completed_tests_count' => TestResult::where('user_id', $user->id)->count(),
                'completion_rate' => round(($completedTasks / $totalTasks) * 100),
            ];
            
            // Задачи, назначенные работнику
            $tasks = Task::where('user_id', $user->id)
                ->with(['manager:id,name'])
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'tasks' => $tasks
        ]);
    }
}