<?php

namespace App\Models;

use App\Traits\UsesNomeSlug;
use Illuminate\Support\Carbon;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Projeto extends BaseModel
{
    use UsesNomeSlug, HasRelationships;

    protected $casts = [
        'ativo' => 'boolean',
        'areas' => 'array',
    ];

    protected $dates = ['data_inicio', 'data_fim'];

    protected $appends = ['assessorado'];

    public function setDataInicioAttribute($value)
    {
        $this->attributes['data_inicio'] = Carbon::createFromFormat('d/m/Y', $value);
    }

    public function setDataFimAttribute($value)
    {
        $this->attributes['data_fim'] = $value ? Carbon::createFromFormat('d/m/Y', $value) : NULL;
    }

    public function getAssessoradoAttribute()
    {
        return $this->assessor()->exists();
    }

    public function inscricoes()
    {
        return $this->hasMany('App\Models\InscricaoProjeto', 'nome_projeto', 'nome_projeto_slug');
    }

    public function todosMembros()
    {
        return $this->hasManyDeepFromRelations($this->inscricoes(), (new InscricaoProjeto)->membro());
    }
    
    public function todosMembrosAtivos()
    {
        return $this->todosMembros()->where('inscricoes_projetos.ativo', true);
    }

    public function membros()
    {
        return $this->todosMembrosAtivos()->where('inscricoes_projetos.funcao', 'Membro');
    }

    public function lider()
    {
        return $this->todosMembrosAtivos()->where('inscricoes_projetos.funcao', 'Líder');
    }

    public function assessor()
    {
        return $this->todosMembrosAtivos()->where('inscricoes_projetos.funcao', 'Assessor');
    }

    public function equipe()
    {
        return $this->belongsTo('App\Models\Equipe', 'nome_equipe', 'nome_equipe_slug');
    }

    public function caixa()
    {
        return $this->morphOne('App\Models\Caixa', 'relacionado', 'tipo_relacionado', 'id_relacionado', 'nome_projeto_slug');
    }

    public function eventos()
    {
        return $this->morphMany('App\Models\Evento', 'relacionado', 'tipo_relacionado', 'id_relacionado', 'nome_projeto_slug');
    }

    public function arquivos()
    {
        return $this->morphMany('App\Models\Arquivo', 'relacionado', 'tipo_relacionado', 'id_relacionado', 'nome_projeto_slug');
    }

    public function matriculaMembrosAtivosPertencentes()
    {
        return $this->todosMembrosAtivos->pluck('matricula')->values();
    }

    public function matriculaMembrosSuperioresProjeto()
    {
        return collect([$this->lider->first(), $this->assessor->first()])->whereNotNull('matricula')->pluck('matricula')->values();
    }

    public function matriculaTodosMembrosSuperiores()
    {
        return $this->equipe->matriculaMembrosSuperiores()->merge($this->matriculaMembrosSuperioresProjeto())->unique();
    }

    public function getMorphClass()
    {
        return 'Projeto';
    }
}
