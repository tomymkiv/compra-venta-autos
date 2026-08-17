<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'avatar',
        'email',
        'password',
        'google_id',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    public function post()
    {
        return $this->hasMany(Post::class, 'user_id');
    }
    public function reviews() // reviews que dejó un usuario
    {
        return $this->hasOne(Review::class, 'reviewer_id');
    }
    public function received_reviews() // reviews recibidas de otros usuarios
    {
        return $this->hasMany(Review::class, 'reviewed_user_id');
    }
    public function contact()
    {
        return $this->hasOne(Contact::class, 'user_id');
    }

    public function rol()
    {
        return $this->roles();
    }
    public function deals()
    {
        return $this->hasMany(Deal::class, 'buyer_id');
    }
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
}
