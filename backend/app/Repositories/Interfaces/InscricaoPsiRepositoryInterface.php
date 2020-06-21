<?php

namespace App\Repositories\Interfaces;

use App\Models\InscricaoPsi;

interface InscricaoPsiRepositoryInterface
{
    public function inscrever(array $dadosValidos);

    public function desinscrever(InscricaoPsi $inscricao);

    public function atualizarCondicao(InscricaoPsi $inscricao, $condicao);
}
