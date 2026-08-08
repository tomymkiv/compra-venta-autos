<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    protected $fillable = ["post_id", "buyer_id", "deal_status_id", 'seller_id', 'rejected_at'];

    protected $casts = [
        'rejected_at' => 'datetime',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }
    public function deal_status()
    {
        return $this->belongsTo(DealStatus::class);
    }
}