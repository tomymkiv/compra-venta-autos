<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReviewStatus extends Model
{
    protected $table = 'review_status';
    protected $fillable = [
        'name',
    ];

    public function review()
    {
        return $this->hasOne(Review::class, 'status_id', 'id');
    }
}