<?php

namespace App\Models;

class InscricaoPsi extends BaseModel
{
    protected $table = 'inscricoes_psis';

    protected $visible = ['id', 'nome_psi', 'nome_projeto', 'nome_equipe', 'area_solicitada', 'condicao', 'tipo'];

    protected $appends = ['tipo'];

    public function getTipoAttribute()
    {
        $tipo = 'gestão';

        if($this->nome_projeto and !$this->nome_equipe)
            $tipo = 'projeto';

        else if(!$this->nome_projeto and $this->nome_equipe)
            $tipo = 'equipe';

        return $tipo;
    }

    public function psi()
    {
        return $this->belongsTo('App\Models\Psi','nome_psi','nome_psi_slug');
    }

    public function membro()
    {
        return $this->belongsTo('App\Models\Usuario','membro_inscrito','matricula');
    }

    public function projeto()
    {
        return $this->belongsTo('App\Models\Projeto','nome_projeto','nome_projeto_slug');
    }

    public function equipe()
    {
        return $this->belongsTo('App\Models\Equipe','nome_equipe','nome_equipe_slug');
    }
}
