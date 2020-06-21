<?php

namespace App\Http\Controllers;

abstract class ApiController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
}
