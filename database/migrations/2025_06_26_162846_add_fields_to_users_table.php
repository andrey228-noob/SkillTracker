<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['worker', 'manager', 'admin'])->default('worker'); // Роль
            $table->enum('gender', ['male', 'female'])->nullable(); // Пол
            $table->string('phone')->nullable(); // Номер телефона
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'gender', 'phone']);
        });
    }
}