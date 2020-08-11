<?php

namespace App\Observers;

use App\Models\Falta;
use App\Notifications\Falta\FaltaCriadaNotification;
use App\Repositories\Interfaces\StrikeRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class FaltaObserver
{
    protected $strikeRepository;

    public function __construct(StrikeRepositoryInterface $strikeRepository)
    {
        $this->strikeRepository = $strikeRepository;
    }

    public function created(Falta $falta)
    {
        $strike = null;
        $tipo = $falta->tipo;
        $membro = $falta->usuario;
        $quantidadeFaltas = $membro->getQuantidadeFaltas($tipo->nome, $falta->nome_projeto);

        $membro->notify(new FaltaCriadaNotification($falta));

        if($quantidadeFaltas % $tipo->quantidade_para_strike == 0)
        {
            $strike['motivo'] = ($quantidadeFaltas > 1 and $tipo->quantidade_para_strike > 1) ? "Acúmulo de $tipo->quantidade_para_strike faltas a $tipo->nome" : "Falta a um(a) $tipo->nome";
        }

        if($strike)
        {
            $strike += ['membro_recebeu' => $membro->matricula, 'membro_aplicou' => Auth::id(), 'situacao' => 'Aprovado', 'data_aprovado' => today()];
            $this->strikeRepository->createApproved($strike);
        }
    }
}
