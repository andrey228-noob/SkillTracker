<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TestResult extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Определяем связь с пользователем
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Определяем связь с тестом
    public function test(): BelongsTo
    {
        return $this->belongsTo(Test::class);
    }
}
