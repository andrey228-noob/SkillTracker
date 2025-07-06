<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Создает новую задачу для работника
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'nullable|date',
            'user_id' => 'required|exists:users,id'
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'due_date' => $validated['due_date'],
            'user_id' => $validated['user_id'],
            'manager_id' => Auth::id(),
            'status' => 'pending'
        ]);

        return redirect()->back()->with('success', 'Задача успешно создана');
    }

    /**
     * Обновляет существующую задачу
     */
    public function update(Request $request, Task $task)
    {
        // Проверяем, что текущий пользователь - менеджер, создавший задачу или администратор
        if ($task->manager_id !== Auth::id() && Auth::user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in_progress,completed,rejected'
        ]);

        $task->update($validated);

        return redirect()->back()->with('success', 'Задача успешно обновлена');
    }

    /**
     * Удаляет задачу
     */
    public function destroy(Task $task)
    {
        // Проверяем, что текущий пользователь - менеджер, создавший задачу или администратор
        if ($task->manager_id !== Auth::id() && Auth::user()->role !== 'admin') {
            abort(403);
        }

        $task->delete();

        return redirect()->back()->with('success', 'Задача успешно удалена');
    }
}