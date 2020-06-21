<?php

namespace App\Http\Controllers\Evento;

use App\Http\Requests\Evento\CriarAtualizarEventoEquipeProjetoRequest;
use App\Models\Equipe;
use App\Models\EventoEquipe;
use App\Repositories\Interfaces\EventoRepositoryInterface;

class EventoEquipeController extends AbstractEventoController
{
    public function __construct(EventoRepositoryInterface $eventoRepository)
    {
        parent::__construct($eventoRepository);
        $this->authorizeResource(Equipe::class, 'equipe');
    }

    public function store(CriarAtualizarEventoEquipeProjetoRequest $request, Equipe $equipe)
    {
        $this->eventoRepository->createEventoEquipe($equipe, $request->validated());
        return response()->json('Evento de equipe criado com sucesso', 201);
    }

    public function update(CriarAtualizarEventoEquipeProjetoRequest $request, Equipe $equipe, EventoEquipe $evento)
    {
        $this->eventoRepository->update($evento, $request->validated());
        return response()->json('Evento de equipe atualizado com sucesso', 200);
    }

    public function destroy(Equipe $equipe, EventoEquipe $evento)
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
