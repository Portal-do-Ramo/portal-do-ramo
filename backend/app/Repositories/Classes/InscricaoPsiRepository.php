<?php

namespace App\Repositories\Classes;

use App\Models\InscricaoProjeto;
use App\Models\InscricaoPsi;
use App\Repositories\Interfaces\InscricaoPsiRepositoryInterface;
use Illuminate\Support\Facades\DB;

class InscricaoPsiRepository implements InscricaoPsiRepositoryInterface
{
    /**
     * Inscreve o membro autenticado na área escolhida
     * Com base no tipo da inscrição enviada
     */
    public function inscrever(array $dadosValidos)
    {
        $inscricaoPsi = [
            'nome_psi' => $dadosValidos['nome_psi'],
            'membro_inscrito' => $dadosValidos['usuario'],
            'area_solicitada' => $dadosValidos['area'],
            'condicao' => 'Pendente'
        ];

        if($dadosValidos['tipo'] == 'projeto')
            $inscricaoPsi += ['nome_projeto' => $dadosValidos['nome']];

        else if($dadosValidos['tipo'] == 'equipe')
            $inscricaoPsi += ['nome_equipe' => $dadosValidos['nome']];

        InscricaoPsi::firstOrCreate($inscricaoPsi);
    }


    public function desinscrever(InscricaoPsi $inscricaoPsi)
    {
        return $inscricaoPsi->delete();
    }

    /**
     * Atualiza a condição da inscrição do membro autenticado
     * Caso reprovado notifica o membro com o resultado do processo
     */
    public function atualizarCondicao(InscricaoPsi $inscricaoPsi, $condicao)
    {
        DB::transaction(function () use($inscricaoPsi, $condicao)
        {
            $inscricaoPsi->update(['condicao'=>$condicao]);

            if($condicao == 'Aprovado')
                $this->aprovarInscricao($inscricaoPsi);
        });
    }

    /**
     * Processa a inscrição aprovada
     * Com base no tipo da inscrição (Projeto-Equipe-Gestão)
     * Caso o tipo seja projeto, verifica o cargo que o membro irá ocupar e o adiciona ao projeto
     */
    private function aprovarInscricao(InscricaoPsi $inscricaoPsi)
    {
        if($inscricaoPsi->tipo == 'projeto')
        {
            $projeto = $inscricaoPsi->projeto;
            $inscricaoProjeto = $projeto->inscricoes()->whereMatriculaMembro($inscricaoPsi->membro_inscrito)->first();

            if($inscricaoProjeto) //Se já faz parte do projeto
            {
                $inscricaoProjeto->update(['funcao' => 'Membro', 'area' => $inscricaoPsi->area_solicitada]);
            }
            else
            {
                $projeto->inscricoes()->save(new InscricaoProjeto(['matricula_membro' => $inscricaoPsi->membro_inscrito, 'area' => $inscricaoPsi->area_solicitada]));
            }
        }
        else if($inscricaoPsi->tipo == 'equipe')
        {
            $equipe = $inscricaoPsi->equipe;

            if($equipe->matricula_assessor != $inscricaoPsi->membro_inscrito)
            {
                $equipe->mudarAssessor($inscricaoPsi->membro_inscrito);
            }
        }
        else if($inscricaoPsi->tipo == 'gestao')
        {
            $hierarquiaAtual = $inscricaoPsi->membro->hierarquia;
            if(!$hierarquiaAtual->diretoria) //Se a hierarquia do inscrito não for de diretoria, então a alteração é feita no BD.
                $inscricaoPsi->membro->update(['hierarquia_id' => ($hierarquiaAtual->firstWhere('nome', $inscricaoPsi->area_solicitada)->id)]);
        }
    }
}
