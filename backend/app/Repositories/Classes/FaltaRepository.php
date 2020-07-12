<?php

namespace App\Repositories\Classes;

use App\Models\Falta;
use App\Models\Usuario;
use App\Models\UsuarioSistema;
use App\Models\WeakModels\TipoFalta;
use App\Repositories\Interfaces\FaltaRepositoryInterface;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class FaltaRepository implements FaltaRepositoryInterface
{
    public function index()
    {
        return UsuarioSistema::getQueryFormatada()
            ->with(['equipes:equipes.nome_equipe_slug', 'equipeCoordena:nome_equipe_slug,matricula_coordenador', 'equipesAssessora:nome_equipe_slug,matricula_assessor'])
            ->withCount('faltas as contagem_total_faltas')
            ->get()
            ->map(fn($usuario) => Arr::except($usuario->toArray(), ['equipes', 'equipe_coordena', 'equipes_assessora']) + ['equipes' => $usuario->equipes->merge($usuario->equipesAssessora)->push($usuario->equipeCoordena)->whereNotNull('nome_equipe_slug')->unique('nome_equipe_slug')->pluck('nome_equipe_slug')]);
    } 

    public function tipoFaltas()
    {
        return TipoFalta::all();
    }

    public function referentes(Usuario $usuario)
    {
        $faltas = Falta::select('uuid', 'data', 'descricao')
            ->rightJoin('tipo_faltas', fn($join) => $join->on('faltas.tipo_id', '=', 'tipo_faltas.id')->where('faltas.matricula_membro', '=', $usuario->matricula))
            ->addSelect('tipo_faltas.nome AS tipo')
            ->leftJoin('projetos', 'faltas.nome_projeto', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto', 'projetos.nome_projeto_slug')
            ->orderBy('data')
            ->get();

        $contagemFaltas = $faltas->groupBy(fn($item, $key) => Str::slug($item['tipo'], '_'))->map(fn($falta) => $falta->whereNotNull('uuid')->count());
        $contagemFaltasPorProjeto = $faltas->whereNotNull('nome_projeto')->countBy('nome_projeto');

        return ['contagem_faltas' => $contagemFaltas, 'faltas_projeto' => $contagemFaltasPorProjeto, 'faltas' => $faltas->whereNotNull('uuid')->values()];
    }

    public function getListaFaltas()
    {
        return Falta::select('data', 'descricao')
            ->join('usuarios', 'faltas.matricula_membro', '=', 'usuarios.matricula')
            ->addSelect('usuarios.nome_completo')
            ->join('tipo_faltas', 'faltas.tipo_id', '=', 'tipo_faltas.id')
            ->addSelect('tipo_faltas.nome')
            ->rightJoin('projetos', 'faltas.nome_projeto', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto')
            ->orderBy('tipo_faltas.nome')
            ->get()
            ->map(fn($falta) => [
                $falta->nome_completo,
                $falta->data,
                $falta->descricao,
                $falta->nome,
                $falta->nome_projeto ?? 'Não há projetos relacionados'
            ]);
    }

    public function create($dadosValidos)
    {
        Falta::create($dadosValidos);
    }

    public function delete($falta)
    {
        $falta->delete();
    }
}
