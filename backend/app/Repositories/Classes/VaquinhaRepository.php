<?php

namespace App\Repositories\Classes;

use App\Models\DoacaoVaquinha;
use App\Models\Usuario;
use App\Models\Vaquinha;
use App\Repositories\Interfaces\VaquinhaRepositoryInterface;

class VaquinhaRepository implements VaquinhaRepositoryInterface
{
    public function index()
    {
        return Vaquinha::select('vaquinhas.nome_vaquinha_slug', 'vaquinhas.nome_vaquinha', 'vaquinhas.aberto', 'vaquinhas.data_inicio', 'vaquinhas.data_fim')
            ->with(['doacoes' => fn($query) => $query->addSelect('doacoes_vaquinhas.uuid', 'doacoes_vaquinhas.nome_vaquinha', 'doacoes_vaquinhas.valor', 'doacoes_vaquinhas.data')->join('usuarios', 'doacoes_vaquinhas.matricula_membro_doador', '=', 'usuarios.matricula')->addSelect('usuarios.matricula', 'usuarios.nome_completo as nome_membro_doador')->orderBy('data')])
            ->get();
    }

    public function getLast()
    {
        return Vaquinha::whereAberto(true)
            ->select('vaquinhas.nome_vaquinha_slug', 'vaquinhas.nome_vaquinha', 'vaquinhas.data_inicio', 'vaquinhas.data_fim')
            ->with(['doacoes' => fn($query) => $query->addSelect('doacoes_vaquinhas.uuid', 'doacoes_vaquinhas.data', 'doacoes_vaquinhas.nome_vaquinha', 'doacoes_vaquinhas.valor')->join('usuarios', 'doacoes_vaquinhas.matricula_membro_doador', '=', 'usuarios.matricula')->addSelect('usuarios.nome_completo as nome_membro_doador')->orderBy('data')])
            ->firstOrFail()
            ->setAppends([]);
    }

    public function create(array $dadosValidos)
    {
        Vaquinha::create($dadosValidos);
    }

    public function addDoacao(Vaquinha $vaquinha, array $dadosValidos)
    {
        $vaquinha->doacoes()->save(new DoacaoVaquinha($dadosValidos));
    }

    public function pertencentes(Usuario $usuario)
    {
        return $usuario->doacoesVaquinha()->select('uuid', 'valor', 'data')->get();
    }
}
