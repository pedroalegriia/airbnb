<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Review\ReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Services\ReviewService;
use App\Support\ApiResponse;
class ReviewController extends Controller
{
    use ApiResponse;
    public function __construct(private ReviewService $reviews) {}
    public function store(ReviewRequest $request) { return $this->success(new ReviewResource($this->reviews->create($request->user(), $request->validated())), 'messages.review_created', 201); }
}
