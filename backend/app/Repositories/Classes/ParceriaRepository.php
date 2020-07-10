<?php

namespace App\Repositories\Classes;

use App\Models\Parceria;
use App\Repositories\Interfaces\ParceriaRepositoryInterface;

class ParceriaRepository implements ParceriaRepositoryInterface
{
    public function index()
    {
        return Parceria::select('uuid', 'beneficios', 'equipes_beneficiadas', 'consolidada', 'como_encaixamos', 'link_site_empresa', 'telefone_empresa', 'email_empresa')->get();
    }

    public function indexPublicas()
    {
        return Parceria::select('uuid', 'beneficios', 'equipes_beneficiadas', 'link_site_empresa', 'telefone_empresa', 'email_empresa')->whereConsolidada(true)->get();
    }

    public function create(array $dadosValidos)
    {
        Parceria::create($dadosValidos);
    }

    public function update(Parceria $parceria, array $dadosValidos)
    {
        $parceria->update($dadosValidos);
    }

    public function delete(Parceria $parceria)
    {
        $parceria->delete();
    }
}