<?php

namespace App\Support;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    protected function success(mixed $data = null, string $messageKey = 'messages.success', int $status = 200, array $replace = []): JsonResponse
    {
        return response()->json(['message' => __($messageKey, $replace), 'data' => $data], $status);
    }

    protected function error(string $messageKey, int $status = 400, array $errors = [], array $replace = []): JsonResponse
    {
        return response()->json(['message' => __($messageKey, $replace), 'errors' => $errors], $status);
    }
}
