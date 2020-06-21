<?php

namespace App\Repositories\Interfaces;

use App\Models\Equipe;
use App\Models\Evento;
use App\Models\Projeto;

interface EventoRepositoryInterface
{
    public function index();

    public function meusEventos();

    public function create(array $dadosValidos);

    public function createEventoEquipe(Equipe $equipe, array $dadosValidos);

    public function createEventoProjeto(Projeto $projeto, array $dadosValidos);

    public function update(Evento $evento, array $dadosValidos);

    public function delete(Evento $evento);
}