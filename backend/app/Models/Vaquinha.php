<?php

namespace App\Models;

use App\Traits\UsesNomeSlug;
use Illuminate\Support\Carbon;

class Vaquinha extends BaseModel
{
    use UsesNomeSlug;

    protected $dates = ['data_inicio', 'data_fim'];

    protected $appends = ['valor_total'];

    protected $casts = ['aberto' => 'boolean'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            $model->data_fim = $model->data_inicio->addDays(6);
        });
    }

    public function doacoes()
    {
        return $this->hasMany('App\Models\DoacaoVaquinha', 'nome_vaquinha', 'nome_vaquinha_slug');
    }

    public function getValorTotalAttribute()
    {
        return $this->doacoes->reduce(fn($carry, $item) => $carry + $item->valor, 0);
    }

    public function setDataInicioAttribute($value)
    {
        $this->attributes['data_inicio'] = Carbon::createFromFormat('d/m/Y', $value);
    }
}
