<?php

namespace App\Traits;

use Ramsey\Uuid\Uuid;

trait UsesUuid
{    
    public static function bootUsesUuid()
    {
       static::creating(function($model) {
            $model->uuid = Uuid::uuid4();
       });
    }

    public function getKeyName()
    {
        return 'uuid';
    }

    public function getKeyType()
    {
        return 'string';
    }

    public function getIncrementing()
    {
        return false;
    }
}