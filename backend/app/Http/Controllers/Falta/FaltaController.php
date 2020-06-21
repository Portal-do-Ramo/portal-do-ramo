<?php

namespace App\Http\Controllers\Falta;

use App\Models\Falta;
use App\Http\Requests\Falta\CriarFaltaRequest;
use App\Http\Resources\HistoricoFaltaResource;
use App\Models\Usuario;
use App\Repositories\Interfaces\FaltaRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class FaltaController extends AbstractFaltaController
{
    public function __construct(FaltaRepositoryInterface $faltaRepository)
    {
        parent::__construct($faltaRepository);
        $this->authorizeResource(Falta::class, 'falta');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->faltaRepository->index();
    }

    public function minhasFaltas()
    {
        return $this->faltaRepository->referentes(Auth::user());
    }

    public function historico(Usuario $usuario)
    {
        return new HistoricoFaltaResource($usuario, $this->faltaRepository);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CriarFaltaRequest $request)
    {
        $this->faltaRepository->create($request->validated());
        return response()->json('Falta registrada com sucesso', 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Falta  $falta
     * @return \Illuminate\Http\Response
     */
    public function destroy(Falta $falta)
    {
        $this->faltaRepository->delete($falta);

        return response()->json('Registro de falta removido com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'index' => 'viewAny',
            'historico' => 'viewAny',
            'store' => 'create',
            'destroy' => 'delete'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return ['index', 'historico', 'store'];
    }
}
