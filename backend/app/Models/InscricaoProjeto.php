<?php

namespace App\Models;

use App\Casts\DataFormatadaCast;
use App\Traits\UsesUuid;

class InscricaoProjeto extends BaseModel
{
    use UsesUuid;

    protected $table = 'inscricoes_projetos';

    protected $casts = [
        'ativo' => 'boolean', 
        'data_saida' => DataFormatadaCast::class
    ];

    public function membro()
    {
        return $this->belongsTo('App\Models\Usuario', 'matricula_membro', 'matricula');
    }

    public function projeto()
    {
        return $this->belongsTo('App\Models\Projeto', 'nome_projeto', 'nome_projeto_slug');
    }
}
