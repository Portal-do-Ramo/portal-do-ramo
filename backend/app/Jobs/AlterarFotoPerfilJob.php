<?php

namespace App\Jobs;

use App\Models\Usuario;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use App\Services\DeletarArquivoService;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Storage;

class AlterarFotoPerfilJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    protected $usuario;
    protected $dadosValidos;
    protected $usuarioRepository;
    protected $service;
    protected $deletarService;
    protected $url;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Usuario $usuario, array $dadosValidos, UsuarioRepositoryInterface $usuarioRepository, VerificarExistenciaDiretorioService $service, DeletarArquivoService $deletarService)
    {
        $this->usuario = $usuario;
        $this->dadosValidos = $dadosValidos;
        $this->usuarioRepository = $usuarioRepository;
        $this->service = $service;
        $this->deletarService = $deletarService;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $pasta = $this->service->handle('Fotos Perfis');
        $path = "$pasta/foto-perfil-{$this->usuario->matricula}";

        $this->deletarService->handle($pasta, "foto-perfil-{$this->usuario->matricula}");

        Storage::cloud()->put($path, base64_decode($this->dadosValidos['foto']));
        $this->url = Storage::cloud()->url($path);
        $this->usuarioRepository->setFotoPerfil($this->usuario, $this->url);
    }
}
