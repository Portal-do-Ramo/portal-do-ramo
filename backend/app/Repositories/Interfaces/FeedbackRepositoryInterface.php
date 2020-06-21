<?php

namespace App\Repositories\Interfaces;

interface FeedbackRepositoryInterface 
{
    public function index();

    public function create(array $dadosValidos);
}