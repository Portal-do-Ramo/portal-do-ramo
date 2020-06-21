<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Support\Carbon;

class RegistroDeCaixa extends BaseModel
{
    use UsesUuid;

    protected $table = 'registros_de_caixa';

    protected $casts = ['exclusivo' => 'boolean'];

    protected $dates = ['data'];

    protected $observables = ['mainCreated', 'subsequentCreated'];

    public function caixa()
    {
        return $this->belongsTo('App\Models\Caixa', 'caixa_relacionado', 'nome_caixa_slug');
    }

    public function setDataAttribute($value)
    {
        $this->attributes['data'] = Carbon::createFromFormat('d/m/Y', $value);
    }

    public static function createMain(array $dadosValidos)
    {
        $registro = self::create($dadosValidos);
        $registro->fireModelEvent('mainCreated', false);
    }

    public static function createSubsequent(array $dadosValidos)
    {
        $registro = self::create($dadosValidos);
        $registro->fireModelEvent('subsequentCreated', false);
    }
}
