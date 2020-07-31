<?php

namespace App\Repositories\Interfaces;

use App\Models\Parceria;

interface ParceriaRepositoryInterface
{
    public function index();

    public function indexPublicas();

    public function create(array $dadosValidos);

    public function update(Parceria $parceria, array $dadosValidos);

    public function alterarLogoParceria(string $fotoUrl, Parceria $parceria);

    public function delete(Parceria $parceria);
}
