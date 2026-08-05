<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'reviewer_id',
        'reviewed_user_id',
        'status_id',
        'rating',
        'comment'
    ];
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
    public function reviewed_user()
    {
        return $this->belongsTo(User::class, 'reviewed_user_id');
    }
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
    public function status()
    {
        return $this->belongsTo(ReviewStatus::class, 'status_id');
    }
}