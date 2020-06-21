<?php

namespace App\Models;

use App\Traits\UsesSerializedDates;
use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model
{
    use UsesSerializedDates;
    
    protected $guarded = [];

    const CREATED_AT = 'data_criado';
    const UPDATED_AT = 'data_alterado';
}
