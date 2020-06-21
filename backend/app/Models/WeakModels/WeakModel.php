<?php

namespace App\Models\WeakModels;

use Illuminate\Database\Eloquent\Model;

class WeakModel extends Model
{
    public $timestamps = false;

    protected $hidden = [];
}
