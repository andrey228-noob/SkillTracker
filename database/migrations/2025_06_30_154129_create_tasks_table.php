<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users'); // Работник, которому назначена задача
            $table->foreignId('manager_id')->constrained('users'); // Менеджер, который назначил задачу
            $table->string('title'); // Название задачи
            $table->text('description'); // Описание задачи
            $table->enum('status', ['pending', 'in_progress', 'completed', 'rejected'])->default('pending'); // Статус задачи
            $table->date('due_date')->nullable(); // Срок выполнения
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
