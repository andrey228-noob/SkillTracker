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
        $user = Auth::user();

        // Валидация входных данных
        $request->validate([
            'answer' => 'required|string',
        ]);

        // Проверяем, существует ли уже результат для этого теста и пользователя
        $testResult = TestResult::firstOrNew([
            'test_id' => $test->id,
            'user_id' => $user->id,
        ]);

        // Если тест уже был пройден, возвращаем ошибку
        if ($testResult->exists && !is_null($testResult->answer)) {
            return back()->withErrors([
                'message' => 'Вы уже проходили этот тест и не можете изменить ответ.',
            ]);
        }

        // Проверяем правильность ответа
        $isCorrect = $request->answer === $test->options['correct'];
        $score = $isCorrect ? 1 : 0; // Можно настроить систему баллов по-другому

        // Сохраняем результат
        $testResult->fill([
            'answer' => $request->answer,
            'score' => $score,
        ])->save();

        return back()->with([
            'message' => 'Ваш ответ успешно сохранен!',
            'score' => $score,
        ]);
    }
}
