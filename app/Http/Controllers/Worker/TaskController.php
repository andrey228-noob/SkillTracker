<?php

namespace App\Http\Controllers\Worker;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Отображает список задач
     */
    public function index()
    {
        $user = Auth::user();
        
        if (in_array($user->role, ['manager', 'admin'])) {
            // Для менеджеров и администраторов - все задачи
            $tasks = Task::with(['manager:id,name', 'user:id,name'])
                ->orderBy('created_at', 'desc')
                ->get();
                
            // Получаем список работников для назначения задач
            $workers = User::where('role', 'worker')
                ->select('id', 'name')
                ->get();
                
            return Inertia::render('Worker/Tasks', [
                'tasks' => $tasks,
                'workers' => $workers,
                'isAdmin' => true
            ]);
        } else {
            // Для работников - только их задачи
            $tasks = Task::where('user_id', Auth::id())
                ->with('manager:id,name')
                ->orderBy('created_at', 'desc')
                ->get();

            return Inertia::render('Worker/Tasks', [
                'tasks' => $tasks,
                'isAdmin' => false
            ]);
        }
    }

    /**
     * Обновляет статус задачи
     */
    public function updateStatus(Request $request, Task $task)
    {
        $user = Auth::user();
        
        // Проверяем права доступа
        if ($user->role === 'worker' && $task->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:in_progress,completed,rejected,pending'
        ]);

        $task->update([
            'status' => $validated['status']
        ]);

        return redirect()->back()->with('success', 'Статус задачи успешно обновлен');
    }
}