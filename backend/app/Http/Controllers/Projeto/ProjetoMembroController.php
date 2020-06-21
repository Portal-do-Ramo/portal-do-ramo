<?php

namespace App\Http\Controllers\Projeto;

use App\Http\Requests\Projeto\AdicionarAssessorProjetoRequest;
use App\Http\Requests\Projeto\AdicionarMembroProjetoRequest;
use App\Http\Requests\Projeto\AtualizarInscricaoMembroProjetoRequest;
use App\Http\Resources\HistoricoProjetoResource;
use App\Models\InscricaoProjeto;
use App\Models\Projeto;
use App\Models\Usuario;
use App\Repositories\Interfaces\ProjetoRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ProjetoMembroController extends AbstractProjetoController
{
    public function __construct(ProjetoRepositoryInterface $projetoRepository)
    {
        parent::__construct($projetoRepository);
        $this->authorizeResource(Projeto::class, 'projeto');
    }

    public function meusProjetos()
    {
        return $this->projetoRepository->historicoProjetos(Auth::user());
    }

    public function historicoProjetos(Usuario $usuario)
    {
        return new HistoricoProjetoResource($usuario, $this->projetoRepository);
    }

    public function membrosDisponiveis(Projeto $projeto)
    {
        return $this->projetoRepository->membrosDisponiveis($projeto);
    }

    public function store(AdicionarMembroProjetoRequest $request, Projeto $projeto)
    {       
        $this->projetoRepository->addMembro($projeto, $request->validated());
        return response()->json('Membro adicinado no projeto com sucesso', 200);
    }

    public function adicionarAssessor(AdicionarAssessorProjetoRequest $request, Projeto $projeto)
    {
        $this->projetoRepository->addAssessor($projeto, $request->validated());
        return response()->json('Assessor adicinado no projeto com sucesso', 200);
    }

    public function update(AtualizarInscricaoMembroProjetoRequest $request, Projeto $projeto, InscricaoProjeto $inscricao)
    {
        $this->projetoRepository->updateMembro($inscricao, $request->validated());
        return response()->json('Troca de função do membro realizada com sucesso', 200);
    }

    public function destroy(Projeto $projeto, InscricaoProjeto $inscricao)
    {
        $this->projetoRepository->removeMembro($inscricao);
        return response()->json('Membro removido do projeto com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'store' => 'gerenciarRelacionado',
            'adicionarAssessor' => 'gerenciarRelacionado',
            'membrosDisponiveis' => 'viewFully',
            'historicoProjetos' => 'viewAny',
            'update' => 'gerenciarRelacionado',
            'destroy' => 'gerenciarRelacionado'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return ['historicoProjetos'];
    }
}
