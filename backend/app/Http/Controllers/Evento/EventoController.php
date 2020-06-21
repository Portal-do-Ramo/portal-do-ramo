<?php

namespace App\Http\Controllers\Evento;

use App\Http\Requests\Evento\CriarAlterarDadosEventoRequest;
use App\Models\Evento;
use App\Repositories\Interfaces\EventoRepositoryInterface;

class EventoController extends AbstractEventoController
{
    public function __construct(EventoRepositoryInterface $eventoRepository)
    {
        parent::__construct($eventoRepository);
        $this->authorizeResource(Evento::class, 'evento');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->eventoRepository->index();
    }

    public function meusEventos()
    {
        return $this->eventoRepository->meusEventos();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CriarAlterarDadosEventoRequest $request)
    {
        $this->eventoRepository->create($request->validated());
        return response()->json('Evento geral criado com sucesso', 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function update(CriarAlterarDadosEventoRequest $request, Evento $evento)
    {
        $this->eventoRepository->update($evento, $request->validated());
        return response()->json('Evento atualizado com sucesso', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function destroy(Evento $evento)
    {
        $this->eventoRepository->delete($evento);
        return response()->json('Evento deletado com sucesso', 200);
    }
}
