<?php

namespace App\Http\Controllers\Evento;

use App\Http\Requests\Evento\CriarAtualizarEventoEquipeProjetoRequest;
use App\Models\EventoProjeto;
use App\Models\Projeto;
use App\Repositories\Interfaces\EventoRepositoryInterface;

class EventoProjetoController extends AbstractEventoController
{
    public function __construct(EventoRepositoryInterface $eventoRepository)
    {
        parent::__construct($eventoRepository);
        $this->authorizeResource(Projeto::class, 'projeto');
    }

    public function store(CriarAtualizarEventoEquipeProjetoRequest $request, Projeto $projeto)
    {
        $this->eventoRepository->createEventoProjeto($projeto, $request->validated());
        return response()->json('Evento de projeto criado com sucesso', 201);
    }

    public function update(CriarAtualizarEventoEquipeProjetoRequest $request, Projeto $projeto, EventoProjeto $evento)
    {
        $this->eventoRepository->update($evento, $request->validated());
        return response()->json('Evento de projeto atualizado com sucesso', 200);
    }

    public function destroy(Projeto $projeto, EventoProjeto $evento)
    {
        $this->eventoRepository->delete($evento);
        return response()->json('Evento de equipe deletado com sucesso');
    }

    protected function resourceAbilityMap()
    {
        return [
            'store' => 'gerenciarRelacionado',
            'update' => 'gerenciarRelacionado',
            'destroy' => 'gerenciarRelacionado'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return [];
    }
}
