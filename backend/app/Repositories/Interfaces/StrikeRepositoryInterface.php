<?php

namespace App\Repositories\Interfaces;

use App\Models\Reavaliacao;
use App\Models\Strike;
use App\Models\Usuario;

interface StrikeRepositoryInterface
{
    public function index();

    public function pertencentes();

    public function historico(Usuario $usuario);

    public function getStrikesSolicitados();

    public function getStrikesAudienciaSolicitada();

    public function getStrikesAprovados();
        
    public function create(array $dadosValidos);

    public function createApproved(array $dadosValidos);

    public function addReavaliacao(Strike $strike, array $dadosValidos);

    public function getReavaliacoes(Strike $strike);

    public function getStrikesASeremReavaliados();

    public function deleteReavaliacao(Reavaliacao $reavaliacao);
}