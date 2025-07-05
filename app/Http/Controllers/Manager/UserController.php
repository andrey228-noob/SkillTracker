<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Task;
use App\Models\Test;
use App\Models\TestResult;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Отображает список всех работников
     */
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'phone', 'gender', 'role')->get();

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

        $results = TestResult::with(['user:id,name', 'test:id,title'])
            ->get();

        return Inertia::render('Users/UserDetails', [
            'user' => $user,
            'tests' => $tests,
            'tasks' => $tasks,
            'results' => $results,
        ]);
    }

    /**
     * Обновляет роль пользователя
     */
    public function updateRole(Request $request, User $user)
    {
        // Проверяем, что текущий пользователь - администратор
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'role' => 'required|in:admin,manager,worker'
        ]);

        // Обновляем только роль
        $user->update(['role' => $validated['role']]);

        // Возвращаем обновленного пользователя
        return response()->json([
            'user' => $user->fresh(),
            'message' => 'Роль пользователя обновлена'
        ]);
    }
}
