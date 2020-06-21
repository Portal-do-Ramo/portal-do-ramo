<?php

namespace App\Repositories\Classes;

use App\Models\Feedback;
use App\Repositories\Interfaces\FeedbackRepositoryInterface;

class FeedbackRepository implements FeedbackRepositoryInterface
{
    public function index()
    {
        return Feedback::select('uuid', 'assunto', 'mensagem', 'satisfacao', 'feedbacks.data_criado')
            ->join('usuarios', 'feedbacks.membro_enviou', '=', 'usuarios.matricula')
            ->addSelect('usuarios.matricula AS matricula_membro_enviou', 'usuarios.nome_completo AS nome_membro_enviou')
            ->orderBy('data_criado')
            ->get();
    }

    public function create(array $dadosValidos)
    {
        Feedback::create($dadosValidos);
    }
}