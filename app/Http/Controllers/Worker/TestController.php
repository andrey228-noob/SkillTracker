<?php

namespace App\Http\Controllers\Worker;

use App\Http\Controllers\Controller;
use App\Models\Test;
use App\Models\TestResult;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TestController extends Controller
{
    /**
     * Отображает список доступных тестов
     */
    public function index()
    {
        $user = Auth::user();

        // Получаем все тесты для менеджеров и администраторов
        // или только назначенные тесты для работников
        if (in_array($user->role, ['manager', 'admin'])) {
            $tests = Test::all();

            // Для администраторов и менеджеров также получаем всех работников
            $workers = User::where('role', 'worker')
                ->select('id', 'name', 'email')
                ->get();

            // Получаем все результаты тестов
            $results = TestResult::with(['user:id,name', 'test:id,title'])
                ->get();

            return Inertia::render('Worker/Tests', [
                'tests' => $tests,
                'results' => $results,
                'workers' => $workers,
                'isAdmin' => true
            ]);
        } else {
            // Для работников - только их тесты
            $tests = Test::all();

            // Получаем результаты тестов текущего пользователя
            $results = TestResult::where('user_id', Auth::id())
                ->with('test')
                ->get();

            return Inertia::render('Worker/Tests', [
                'tests' => $tests,
                'results' => $results,
                'isAdmin' => false
            ]);
        }
    }

    /**
     * Обрабатывает отправку теста
     */
    public function submit(Request $request, Test $test)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
            'user_id' => 'nullable|exists:users,id'
        ]);

        // Определяем пользователя, для которого сохраняем результат
        $userId = Auth::user()->role === 'worker'
            ? Auth::id()
            : ($validated['user_id'] ?? Auth::id());

        // Получаем правильные ответы из теста
        $options = json_decode($test->options, true);

        // Подсчитываем количество правильных ответов
        $score = 0;
        foreach ($validated['answers'] as $questionId => $answer) {
            if (isset($options[$questionId]) && $options[$questionId]['correct'] === $answer) {
                $score++;
            }
        }

        // Сохраняем результат теста
        TestResult::updateOrCreate(
            ['user_id' => $userId, 'test_id' => $test->id],
            ['score' => $score]
        );

        return redirect()->back()->with('success', 'Тест успешно отправлен');
    }
}
