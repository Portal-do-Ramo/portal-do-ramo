<?php

namespace App\Repositories\Classes;

use App\Models\Equipe;
use App\Models\Evento;
use App\Models\EventoEquipe;
use App\Models\EventoProjeto;
use App\Models\Projeto;
use App\Repositories\Interfaces\EventoRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class EventoRepository implements EventoRepositoryInterface
{

    public function index()
    {
        return Evento::select('eventos.uuid', 'eventos.nome_evento', 'eventos.descricao', 'eventos.data_evento', 'eventos.hora_evento', 'eventos.tipo_relacionado', 'eventos.evento_diretoria')
            ->leftJoin('equipes', fn($join) => $join->on('eventos.id_relacionado', '=', 'equipes.nome_equipe_slug')->where('eventos.tipo_relacionado', 'Equipe'))
            ->addSelect('equipes.nome_equipe')
            ->leftJoin('projetos', fn($join) => $join->on('eventos.id_relacionado', '=', 'projetos.nome_projeto_slug')->where('eventos.tipo_relacionado', 'Projeto'))
            ->addSelect('projetos.nome_projeto')
            ->get();
    }

    public function meusEventos()
    {
        $usuario = Auth::user();
        $projetos = $usuario->projetos()->select('projetos.nome_projeto_slug')->get()->values()->toArray();
        
        $equipesProjetos = $usuario->equipes()->select('equipes.nome_equipe_slug')->get();
        $equipesAssessora = $usuario->equipesAssessora()->select('equipes.nome_equipe_slug')->get();
        $equipesCoordena = $usuario->equipeCoordena()->select('equipes.nome_equipe_slug')->get();

        $equipes = $equipesProjetos->merge($equipesAssessora)->merge($equipesCoordena)->values()->toArray();

        return Evento::select('eventos.uuid', 'eventos.nome_evento', 'eventos.descricao', 'eventos.data_evento', 'eventos.hora_evento')
            ->when(!$usuario->hierarquia->diretoria, fn($query) => $query->whereEventoDiretoria(false), fn($query) => $query->addSelect('evento_diretoria'))
            ->whereNull('id_relacionado')
            ->orWhereIn('id_relacionado', $projetos + $equipes)
            ->get();
    }

    public function create(array $dadosValidos)
    {
        Evento::create($dadosValidos);
    }

    public function createEventoEquipe(Equipe $equipe, array $dadosValidos)
    {
        $equipe->eventos()->save(new EventoEquipe($dadosValidos));
    }

    public function createEventoProjeto(Projeto $projeto, array $dadosValidos)
    {
        $projeto->eventos()->save(new EventoProjeto($dadosValidos));
    }

    public function update(Evento $evento, array $dadosValidos)
    {
        $evento->update($dadosValidos);
    }

    public function delete(Evento $evento)
    {
        $evento->delete();
    }
}