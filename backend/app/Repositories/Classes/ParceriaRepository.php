<?php

namespace App\Repositories\Classes;

use App\Models\Parceria;
use App\Repositories\Interfaces\ParceriaRepositoryInterface;

class ParceriaRepository implements ParceriaRepositoryInterface
{
    public function index()
    {
        return Parceria::select('uuid', 'nome_empresa', 'foto_url', 'beneficios', 'equipes_beneficiadas', 'consolidada', 'como_encaixamos', 'link_site_empresa', 'telefone_empresa', 'email_empresa', 'nivel')
            ->orderBy('nivel')
            ->get();
    }

    public function indexPublicas()
    {
        return Parceria::select('uuid', 'nome_empresa', 'foto_url', 'beneficios', 'equipes_beneficiadas', 'link_site_empresa', 'telefone_empresa', 'email_empresa', 'nivel')
            ->whereConsolidada(true)
            ->orderBy('nivel')
            ->get();
    }

    public function create(array $dadosValidos)
    {
        Parceria::create($dadosValidos);
    }

    public function update(Parceria $parceria, array $dadosValidos)
    {
        $parceria->update($dadosValidos);
    }

    public function alterarLogoParceria(string $fotoUrl, Parceria $parceria)
    {
        $parceria->update(['foto_url' => $fotoUrl]);
    }

    public function delete(Parceria $parceria)
    {
        $parceria->delete();
    }
}