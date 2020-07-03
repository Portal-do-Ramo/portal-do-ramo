<?php

namespace App\Http\Controllers\Equipe;

use App\Http\Requests\Arquivo\AtualizarArquivoRequest;
use App\Http\Requests\Arquivo\CriarArquivoEquipeRequest;
use App\Jobs\DeletarArquivoJob;
use App\Jobs\EditarArquivoEquipeJob;
use App\Jobs\UploadArquivoEquipeJob;
use App\Models\Arquivo;
use App\Models\Equipe;
use App\Repositories\Interfaces\EquipeRepositoryInterface;
use App\Services\BuscarNovoArquivoService;
use App\Services\DeletarArquivoService;
use App\Services\VerificarExistenciaDiretorioService;

class EquipeArquivosController extends AbstractEquipeController
{
    public function __construct(EquipeRepositoryInterface $equipeRepository)
    {
        parent::__construct($equipeRepository);
        $this->authorizeResource(Equipe::class, 'equipe');
    }

    public function store(CriarArquivoEquipeRequest $request, Equipe $equipe, VerificarExistenciaDiretorioService $service, BuscarNovoArquivoService $buscaService)
    {
        UploadArquivoEquipeJob::dispatch($equipe, $request->validated(), $this->equipeRepository, $service, $buscaService);
        return response()->json('Upload do arquivo feito com sucesso', 200);
    }

    public function destroy(Equipe $equipe, Arquivo $arquivo, DeletarArquivoService $deleteService)
    {
        DeletarArquivoJob::dispatch($arquivo, $deleteService);
        return response()->json('Arquivo removido com sucesso', 200);
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
