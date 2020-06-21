<?php

namespace App\Repositories\Classes;

use App\Models\InscricaoPsi;
use App\Repositories\Interfaces\InscricaoPsiRepositoryInterface;

class InscricaoPsiRepository implements InscricaoPsiRepositoryInterface
{
    /**
     * Inscreve o membro autenticado na área escolhida
     * Com base no tipo da inscrição enviada
     */
    public function inscrever(array $dadosValidos)
    {
        $inscricao = [
            'nome_psi' => $dadosValidos['nome_psi'],
            'membro_inscrito' => $dadosValidos['usuario'],
            'area_solicitada' => $dadosValidos['area'],
            'condicao' => 'Pendente'
        ];

        if($dadosValidos['tipo'] == 'projeto')
            $inscricao += ['nome_projeto' => $dadosValidos['nome']];

        else if($dadosValidos['tipo'] == 'equipe')
            $inscricao += ['nome_equipe' => $dadosValidos['nome']];

        InscricaoPsi::firstOrCreate($inscricao);
    }


    public function desinscrever(InscricaoPsi $inscricao)
    {
        return $inscricao->delete();
    }

    /**
     * Atualiza a condição da inscrição do membro autenticado
     * Caso reprovado notifica o membro com o resultado do processo
     */
    public function atualizarCondicao(InscricaoPsi $inscricao, $condicao)
    {
        $inscricao->update(['condicao'=>$condicao]);

        if($condicao == 'Aprovado')
        {
            $this->aprovarInscricao($inscricao);
        }
    }

    /**
     * Processa a inscrição aprovada
     * Com base no tipo da inscrição (Projeto-Equipe-Gestão)
     * Caso o tipo seja projeto, verifica o cargo que o membro irá ocupar e o adiciona ao projeto
     */
    private function aprovarInscricao(InscricaoPsi $inscricao)
    {
        if($inscricao->tipo == 'projeto')
        {
            $projeto = $inscricao->projeto;

            if($inscricao->area_solicitada == "Líder")
                $cargo = "Líder";

            else if($inscricao->area_solicitada == "Assessor")
                $cargo = "Assessor";

            else
                $cargo = "Membro";

            if($projeto->matriculaMembrosPertencentes()->contains($inscricao->membro_inscrito))
            {
                $projeto->todosMembros()->updateExistingPivot($inscricao->membro_inscrito,
                    ['nome_projeto'=>$inscricao->nome_projeto,
                    'funcao'=>$cargo]);
            }
            else
            {
                $projeto->todosMembros()->attach($inscricao->membro_inscrito,
                    ['nome_projeto'=>$inscricao->nome_projeto,
                    'data_entrada'=>today()->format('d/m/Y'),
                    'funcao'=>$cargo]);
            }
        }
        else if($inscricao->tipo == 'equipe')
        {
            $inscricao->equipe->update(['matricula_assessor' => $inscricao->membro_inscrito]);
        }
        else if($inscricao->tipo == 'gestão')
        {
            $hierarquiaAtual = $inscricao->membro->hierarquia;
            if(!$hierarquiaAtual->diretoria) //Se a hierarquia do inscrito não for de diretoria a alteração é feita no BD.
                $inscricao->membro->update(['hierarquia_id' => ($hierarquiaAtual->firstWhere('nome', $inscricao->area_solicitada)->id)]);
        }
    }
}
