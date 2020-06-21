<?php

namespace App\Policies\Pessoas;

use App\Models\InscricaoPsi;
use App\Models\Psi;
use App\Models\Usuario;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class InscricaoPsiPolicy
{
    use HandlesAuthorization;

    public function store(Usuario $user, array $dadosValidos)
    {
        $psi = Psi::find($dadosValidos['nome_psi']);

        if(!$psi->aberto)
            return Response::deny('Não é permitido se inscrever em um PS Interno fechado');

        if($dadosValidos['tipo'] == 'projeto')
        {
            $projeto = $psi->projetos->find($dadosValidos['nome']);
            if(!$projeto) //Caso não encontre o projeto
                return Response::deny('Projeto não encontrado');

            else if(!collect($projeto->pivot->areas_vagas)->has($dadosValidos['area'])) //Caso não encontre a área no projeto
                return Response::deny('Área do projeto inválida');
        }
        else if($dadosValidos['tipo'] == 'equipe')
        {
            $equipe = $psi->equipes->find($dadosValidos['nome']);
            if(!$equipe) //Caso não encontre a equipe
                return Response::deny('Equipe não encontrada');

            if(!collect($equipe->pivot->areas_vagas)->has($dadosValidos['area'])) //Caso não encontre a área na equipe
                return Response::deny('Área da equipe inválida');
        }
        else if($dadosValidos['tipo'] == 'gestão')
        {
            if(collect($psi->gestao_areas_vagas)->pluck('area_vagas')->where($dadosValidos['area'])->isEmpty()) //Caso não encontre a área de gestão
                return Response::deny('Área da gestão inválida');
        }
        else
            return Response::deny('Tipo de inscrição inválida');

        return Response::allow();
    }


    public function validarInscricao(Usuario $user, InscricaoPsi $inscricao)
    {
        return $inscricao->psi->jaFechou() and ($user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas'));
    }


    public function delete(Usuario $user, InscricaoPsi $inscricao)
    {
        return ($inscricao->psi->aberto) and ($user->matricula == $inscricao->membro_inscrito);
    }
}
