<?php

namespace App\Http\Controllers;

use Auth;

abstract class Controller
{
    protected $loguedUser;
    protected $paginateLimit = 12;

    public function __construct()
    {
        $this->loguedUser = Auth::user();
    }
}