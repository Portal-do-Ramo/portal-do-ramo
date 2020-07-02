<?php

namespace App\Http\Controllers\Psi;

use App\Http\Requests\Psi\AddAreaGestaoRequest;
use App\Http\Requests\Psi\AtualizarPsiRequest;
use App\Http\Requests\Psi\CriarPsiRequest;
use App\Http\Resources\PsiResource;
use App\Models\Psi;
use App\Repositories\Interfaces\PsiRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class PsiController extends AbstractPsiController
{

    public function __construct(PsiRepositoryInterface $psiRepository)
    {
        parent::__construct($psiRepository);
        $this->authorizeResource(Psi::class, 'psi');
    }

    /**
     * Retorna de forma simplificada todas as PSIs existentes no BD
     *
     *
     */
    public function index()
    {
       return $this->psiRepository->index();
    }

    /**
     * Cria uma PSI
     * Com base em uma request passada como parametro
     *
     */
    public function store(CriarPsiRequest $request)
    {
        $psi_slug = $this->psiRepository->create($request->validated() + ['membro_criou' => Auth::id()]);

        return response()->json($psi_slug, 201);
    }

    /**
     * Mostra de forma completa uma PSi especifica
     * Com base no id passada como parametro
     * Simplifica e evita repetições no envio para o front
     * quando o usuario não está autorizado para ver todos os inscritos
     *
     */
    public function show(Psi $psi)
    {
        return new PsiResource($psi);
    }

    /**
     * Atualiza uma PSI especifica
     * Com base no ID da PSI e em uma request passado como parametro
     *
     */
    public function update(Psi $psi, AtualizarPsiRequest $request)
    {
        $this->psiRepository->update($psi,$request->validated());

        return response()->json('PS Interno atualizado com sucesso', 200);
    }


    /**
     * Deleta uma PSI especifica
     * Com base no ID da PSI passado como parametro
     *
     */
    public function destroy(Psi $psi)
    {
        $this->psiRepository->destroy($psi);

        return response()->json('PS Interno deletado com sucesso', 200);
    }

    /**
     * Armazena áreas de gestão no json de areas_vagas em uma PSI especifica
     * Com base no ID da PSI passado como parametro e com um request válida
     *
     */
    public function storeGestao(Psi $psi, AddAreaGestaoRequest $request)
    {
        $this->psiRepository->storeGestao($psi,$request->validated());

        return response()->json('Área de gestão criado com sucesso', 201);
    }

    /**
     * Remove uma area de gestão no json de areas_vagas em uma PSI especifica
     * Com base no ID da PSI passado como parametro e com uma area de gestão especifica
     *
     */
    public function destroyGestao(Psi $psi, $area_gestao)
    {
        $gestao = collect($psi->gestao_areas_vagas);
        if($gestao->contains('nome_area_slug', $area_gestao))
        {
            $this->psiRepository->destroyGestao($psi, $area_gestao, $gestao);
            return response()->json('Área de gestão deletada com sucesso', 200);
        }
        return response()->json('Área de gestão não existe', 404);
    }

    /**
     * Usado somente para o front-end ter a referencia dos nomes das áreas padrões
     *
     */
    public function tiposAreas()
    {
        return $this->psiRepository->tiposAreas();
    }

    protected function resourceAbilityMap()
    {
        return [
            'show' => 'view',
            'store' => 'create',
            'update' => 'update',
            'destroy' => 'delete',
            'storeGestao' => 'create',
            'destroyGestao' => 'delete',
        ];
    }
}
