<?php

namespace App\Repositories\Interfaces;

use App\Models\InscricaoProjeto;
use App\Models\Projeto;
use App\Models\Usuario;

interface ProjetoRepositoryInterface
{
    public function index();

    public function selectProjetos();

    public function selectProjetosPSI();

    public function historicoProjetos(Usuario $usuario);

    public function getMembros(Projeto $projeto);

    public function membrosDisponiveis(Projeto $projeto);

    public function getEventos(Projeto $projeto);

    public function create(array $dadosValidos);

    public function update(Projeto $projeto, array $dadosValidos);

    public function updateAreas(Projeto $projeto, array $dadosValidos);

    public function addMembro(Projeto $projeto, array $dadosValidos);

    public function addAssessor(Projeto $projeto, array $dadosValidos);

    public function updateMembro(InscricaoProjeto $inscricao, array $dadosValidos);

    public function removeMembro(InscricaoProjeto $inscricao);

    public function addArquivo(Projeto $projeto, array $dadosValidos);

    public function getArquivos(Projeto $projeto);
}
