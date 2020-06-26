<?php

namespace App\Http\Controllers\Usuario;

use App\Http\Requests\Usuario\AtualizarFotoPerfilRequest;
use App\Http\Requests\Usuario\PrimeiroLoginRequest;
use App\Http\Requests\Usuario\AtualizarTotalmenteUsuarioRequest;
use App\Http\Requests\Usuario\AtualizarUsuarioRequest;
use App\Http\Requests\Usuario\CriarUsuarioRequest;
use App\Http\Resources\MembroResource;
use App\Http\Resources\PerfilCompletoResource;
use App\Http\Resources\PerfilResource;
use App\Jobs\AlterarFotoPerfilJob;
use App\Jobs\CriarUsuarioJob;
use App\Models\Membro;
use App\Models\Usuario;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends AbstractUsuarioController
{
    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        parent::__construct($usuarioRepository); 
        $this->authorizeResource(Usuario::class, 'usuario');
    }

    public function index()
    {
        return $this->usuarioRepository->index();
    }

    public function indexMensagem()
    {
        return $this->usuarioRepository->indexMensagens();
    }
    
    public function search()
    {
        return $this->usuarioRepository->searchUsuario();
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CriarUsuarioRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CriarUsuarioRequest $request, VerificarExistenciaDiretorioService $service)
    {
        CriarUsuarioJob::dispatch($request->validated(), $this->usuarioRepository, $service);
        return response()->json('Registro de membro criado com sucesso', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $membro
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Usuario $usuario)
    {
        return new PerfilResource($usuario);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $membro
     * @return \Illuminate\Http\JsonResponse
     */
    public function showFully(Usuario $usuario)
    {
        return new PerfilCompletoResource($usuario);
    }

    public function meuPerfil()
    {
        return new MembroResource(Auth::user()->membro);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Usuario\AtualizarUsuarioRequest  $request
     * @param  Usuario  $membro
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(AtualizarUsuarioRequest $request, Usuario $usuario)
    {
        $this->usuarioRepository->simpleUpdate($usuario, $request->validated());
        return response()->json('Membro atualizado com sucesso', 200);
    }

    /**
     * Undocumented function
     *
     * @param \App\Http\Requests\Usuario\AtualizarTotalmenteUsuarioRequest $request
     * @param Membro $membro
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateFully(AtualizarTotalmenteUsuarioRequest $request, Usuario $usuario)
    {
        $this->usuarioRepository->updateFully($usuario, $request->validated());
        return response()->json("Informações do membro {$usuario->nome_completo} foram atualizadas com sucesso", 200);
    }

    /**
     * Função que realiza as atualizações do usuário no primeiro login, alterando seu status de ativo, para que
     * não tenha que ser refeito
     *
     * @param PrimeiroLoginRequest $request
     * @param Usuario $membro
     * @return \Illuminate\Http\JsonResponse
     */
    public function primeiroLogin(PrimeiroLoginRequest $request, Usuario $usuario)
    {
        $this->usuarioRepository->primeiroLogin($usuario, $request->validated());
        return response()->json('Informações atualizadas com sucesso', 200);
    }

    public function updateFotoPerfil(AtualizarFotoPerfilRequest $request, Usuario $usuario, VerificarExistenciaDiretorioService $service)
    {
        $job = new AlterarFotoPerfilJob($usuario, $request->validated(), $this->usuarioRepository, $service);
        $job::dispatchNow();

        return response()->json($job->getResponse(), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Usuario $usuario)
    {
        $this->usuarioRepository->setDesligado($usuario);
        return response()->json('Membro deletado com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'store' => 'create',
            'update' => 'update',
            'uploadFotoPerfil' => 'update',
            'showFully' => 'viewFully',
            'primeiroLogin' => 'firstUpdate',
            'updateFully' => 'updateFully',
            'destroy' => 'delete'
        ];
    }
}
