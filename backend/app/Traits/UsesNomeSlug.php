<?php 

namespace App\Traits;

use Illuminate\Support\Str;

trait UsesNomeSlug
{
    protected static function bootUsesNomeSlug()
    {
        $nome = strtolower('nome_'.Str::snake(class_basename(self::class)));
        static::creating(function($model) use ($nome) {
            $model->{$model->getKeyName()} = Str::slug($model->{$nome});
        });

        static::updating(function($model) use ($nome) {
            if($model->isDirty($nome)) 
                $model->{$model->getKeyName()} = Str::slug($model->{$nome});
        });
    }

    public function getKeyName()
    {
        return strtolower('nome_'.Str::snake(class_basename(self::class)).'_slug');
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