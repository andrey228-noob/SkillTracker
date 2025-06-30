<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Manager\UserController as ManagerUserController;
use App\Http\Controllers\Manager\TaskController as ManagerTaskController;
use App\Http\Controllers\Worker\TaskController as WorkerTaskController;
use App\Http\Controllers\Worker\TestController as WorkerTestController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Маршруты для менеджера и администратора
Route::middleware(['auth', 'role:manager,admin'])->group(function () {
    Route::get('/users', [ManagerUserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}', [ManagerUserController::class, 'show'])->name('users.show');
    
    Route::post('/tasks', [ManagerTaskController::class, 'store'])->name('tasks.store');
    Route::put('/tasks/{task}', [ManagerTaskController::class, 'update'])->name('tasks.update');
    Route::delete('/tasks/{task}', [ManagerTaskController::class, 'destroy'])->name('tasks.destroy');
    
    // Добавляем доступ к тестам для менеджеров и администраторов
    Route::get('/tests', [WorkerTestController::class, 'index'])->name('tests.index');
});

// Маршруты для рабочего
Route::middleware(['auth', 'role:worker'])->prefix('worker')->name('worker.')->group(function () {
    Route::get('/tests', [WorkerTestController::class, 'index'])->name('tests.index');
    Route::post('/tests/{test}/submit', [WorkerTestController::class, 'submit'])->name('tests.submit');
    
    Route::get('/tasks', [WorkerTaskController::class, 'index'])->name('tasks.index');
    Route::put('/tasks/{task}/update-status', [WorkerTaskController::class, 'updateStatus'])->name('tasks.update-status');
});
