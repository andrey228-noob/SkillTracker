<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Test extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Определяем связь с результатами тестов
    public function testResults(): HasMany
    {
        return $this->hasMany(TestResult::class);
    }
}