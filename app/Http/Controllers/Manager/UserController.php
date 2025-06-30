<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Task;
use App\Models\Test;
use App\Models\TestResult;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Отображает список всех работников
     */
    public function index()
    {
        $users = User::where('role', 'worker')
            ->select('id', 'name', 'email', 'phone', 'gender')
            ->get();

        return Inertia::render('Users/UsersList', [
            'users' => $users
        ]);
    }

    /**
     * Отображает детальную информацию о работнике
     */
    public function show(User $user)
    {
        // Проверяем, что просматриваемый пользователь - работник
        // if ($user->role !== 'worker') {
        //     abort(404);
        // }

        // Получаем тесты
        $tests = Test::all();
        
        // Получаем задачи для этого работника
        $tasks = Task::where('user_id', $user->id)
            ->with('manager:id,name')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Users/UserDetails', [
            'user' => $user,
            'tests' => $tests,
            'tasks' => $tasks
        ]);
    }
}