<?php

namespace App\Repositories\Classes;

use App\Models\Reavaliacao;
use App\Models\Strike;
use App\Models\Usuario;
use App\Models\UsuarioSistema;
use App\Repositories\Interfaces\StrikeRepositoryInterface;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class StrikeRepository implements StrikeRepositoryInterface
{
    public function index()
    {
        return UsuarioSistema::getQueryFormatada()
            ->with(['strikesRecebeuAprovados' => fn($query) => $query->select('uuid', 'motivo', 'data_criado', 'membro_recebeu')->whereSituacao('Aprovado'),'equipes:equipes.nome_equipe_slug', 'equipeCoordena:nome_equipe_slug,matricula_coordenador', 'equipesAssessora:nome_equipe_slug,matricula_assessor'])
            ->withCount(['strikesRecebeuAprovados AS contagem_strikes' => fn($query) => $query->where('situacao', 'Aprovado')])
            ->get()
            ->map(fn($usuario) => Arr::except($usuario->toArray(), ['equipes', 'equipe_coordena', 'equipes_assessora']) + ['equipes' => $usuario->equipes->merge($usuario->equipesAssessora)->push($usuario->equipeCoordena)->whereNotNull('nome_equipe_slug')->unique('nome_equipe_slug')->pluck('nome_equipe_slug')]);
    }

    public function pertencentes()
    {
        $strikesRecebeu = Auth::user()->strikesRecebeuAprovados()
            ->join('usuarios', 'strikes.membro_aplicou', '=', 'usuarios.matricula')
            ->select($this->selecionarColunasStrike('aplicou'))
            ->get();

        $strikesEnviou = Auth::user()->strikesAplicou()
            ->join('usuarios', 'strikes.membro_recebeu', '=', 'usuarios.matricula')
            ->select($this->selecionarColunasStrike('recebeu'))
            ->get();


        return ['strikes_recebeu' => $strikesRecebeu, 'strikes_enviou' => $strikesEnviou];
    }

    public function historico(Usuario $usuario)
    {
        $strikesEnviou = $usuario->strikesAplicou()
            ->join('usuarios', 'strikes.membro_recebeu', '=', 'usuarios.matricula')
            ->select($this->selecionarColunasStrike('recebeu'))
            ->get();

        $strikesRecebeu = $usuario->strikesRecebeu()
            ->join('usuarios', 'strikes.membro_aplicou', '=', 'usuarios.matricula')
            ->select($this->selecionarColunasStrike('aplicou'))
            ->get();

        return ['strikes_recebeu' => $strikesRecebeu, 'strikes_enviou' => $strikesEnviou];
    }

    private function selecionarColunasStrike($estado)
    {
        return [
            'strikes.uuid', 
            "usuarios.nome_completo AS nome_membro_$estado",
            "membro_$estado AS matricula_membro_$estado",
            'strikes.situacao',
            'strikes.aprovado',
            'strikes.data_aprovado',
            'strikes.motivo',
            'strikes.audiencia_solicitada',
            'strikes.data_audiencia_solicitada',
            'strikes.data_audiencia',
            'strikes.hora_audiencia',
            'strikes.data_criado',
        ];
    }

    public function getStrikesSolicitados()
    {
        return Strike::where('strikes.situacao', 'Solicitado')
            ->select('uuid', 'motivo', 'strikes.data_criado')
            ->join('usuarios as membro_aplicou', 'membro_aplicou.matricula', '=', 'strikes.membro_aplicou')
            ->addSelect('membro_aplicou.matricula as matricula_membro_aplicou', 'membro_aplicou.nome_completo as nome_membro_aplicou')
            ->join('usuarios as membro_recebeu', 'membro_recebeu.matricula', '=', 'strikes.membro_recebeu')
            ->addSelect('membro_recebeu.matricula as matricula_membro_recebeu', 'membro_recebeu.nome_completo as nome_membro_recebeu')
            ->get();
    }

    public function getStrikesAudienciaSolicitada()
    {
        $strikes = Strike::whereAudienciaSolicitada(true)
            ->select('uuid', 'motivo', 'data_audiencia_solicitada', 'data_audiencia', 'hora_audiencia', 'data_aprovado', 'strikes.data_criado')
            ->join('usuarios as membro_aplicou', 'membro_aplicou.matricula', '=', 'strikes.membro_aplicou')
            ->addSelect('membro_aplicou.matricula as matricula_membro_aplicou', 'membro_aplicou.nome_completo as nome_membro_aplicou')
            ->join('usuarios as membro_recebeu', 'membro_recebeu.matricula', '=', 'strikes.membro_recebeu')
            ->addSelect('membro_recebeu.matricula as matricula_membro_recebeu', 'membro_recebeu.nome_completo as nome_membro_recebeu')
            ->get();

        $strikesAudienciaSolicitada = $strikes->whereNull('data_audiencia')->map(fn($strike) => Arr::except($strike, ['data_audiencia', 'hora_audiencia']))->values();
        $strikesAudienciaMarcada = $strikes->whereNotNull('data_audiencia')->values();

        return ['audiencia_solicitada' => $strikesAudienciaSolicitada, 'audiencia_marcada' => $strikesAudienciaMarcada];
    }

    public function getStrikesAprovados()
    {
        return Strike::where('strikes.situacao', 'Aprovado')
            ->join('usuarios as usuario_aplicou', 'strikes.membro_aplicou', '=', 'usuario_aplicou.matricula')
            ->join('usuarios as usuario_recebeu', 'strikes.membro_recebeu', '=', 'usuario_recebeu.matricula')
            ->addSelect('usuario_aplicou.nome_completo as nome_aplicou', 'usuario_recebeu.nome_completo as nome_recebeu','motivo', 'strikes.data_criado', 'data_aprovado')
            ->orderBy('data_criado')
            ->get();
    }

    public function create(array $dadosValidos)
    {
        Strike::create($dadosValidos);
    }

    public function addReavaliacao(Strike $strike, array $dadosValidos)
    {
        $strike->reavaliacoes()->save(new Reavaliacao($dadosValidos));
    }

    public function getReavaliacoes(Strike $strike)
    {
        return $strike->reavaliacoes()->select('reavaliacoes.uuid', 'reavaliacoes.constatacao', 'reavaliacoes.data')->get();
    }

    public function deleteReavaliacao(Reavaliacao $reavaliacao)
    {
        $reavaliacao->delete();
    }
}
