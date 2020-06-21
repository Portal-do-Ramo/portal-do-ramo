<?php

namespace App\Models;

use App\Traits\UsesNomeSlug;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Equipe extends BaseModel
{
    use HasRelationships, UsesNomeSlug;

    protected $casts = [
        'matriz_habilidades' => 'array'
    ];

    protected $observables = ['changedCoordinator', 'changedAdvisor'];

    public function membros()
    {
        return $this->hasManyDeepFromRelations($this->projetosAtivos(), (new Projeto)->todosMembros()->where('inscricoes_projetos.ativo', 1));
    }

    public function coordenador()
    {
        return $this->belongsTo('App\Models\Usuario', 'matricula_coordenador', 'matricula');
    }

    public function assessor()
    {
        return $this->belongsTo('App\Models\Usuario', 'matricula_assessor', 'matricula');
    }

    public function projetos()
    {
        return $this->hasMany('App\Models\Projeto', 'nome_equipe', 'nome_equipe_slug');
    }

    public function projetosAtivos()
    {
        return $this->projetos()->whereAtivo(true);
    }

    public function caixas()
    {
        return $this->morphMany('App\Models\Caixa', 'relacionado', 'tipo_relacionado', 'id_relacionado', 'nome_equipe_slug');
    }

    public function caixaPrincipal()
    {
        return $this->morphOne('App\Models\Caixa', 'relacionado', 'tipo_relacionado', 'id_relacionado', 'nome_equipe_slug')->where('emergencial_equipe', false);
    }

    public function caixaEmergencial()
    {
        return $this->morphOne('App\Models\Caixa', 'relacionado', 'tipo_relacionado', 'id_relacionado', 'nome_equipe_slug')->where('emergencial_equipe', true);
    }

    public function eventos()
    {
        return $this->morphMany('App\Models\Evento', 'relacionado', 'tipo_relacionado', 'id_relacionado', 'nome_equipe_slug');
    }

    public function arquivos()
    {
        return $this->morphMany('App\Models\Arquivo', 'relacionado', 'tipo_relacionado', 'id_relacionado', 'nome_equipe_slug');
    }

    public function matriculaMembrosPertencentes()
    {
        return $this->membros()->pluck('matricula')->merge($this->matriculaMembrosSuperiores())->unique();
    }

    public function matriculaMembrosSuperiores()
    {
        return collect([$this->matricula_assessor, $this->matricula_coordenador])->whereNotNull()->values();
    }

    public function mudarCoordenador(string $matricula_coordenador)
    {
        $this->matricula_coordenador = $matricula_coordenador;
        $this->save();

        $this->fireModelEvent('changedCordinator', false);
    }

    public function mudarAssessor(string $matricula_assessor)
    {
        $this->matricula_assessor = $matricula_assessor;
        $this->save();

        $this->fireModelEvent('changedAdvisor', false);
    }
}
