<?php

namespace App\Jobs;

use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class CriarUsuarioJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $dadosValidos;
    protected $usuarioRepository;
    protected $service;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $dadosValidos, UsuarioRepositoryInterface $usuarioRepository, VerificarExistenciaDiretorioService $service)
    {
        $this->dadosValidos = $dadosValidos;
        $this->usuarioRepository = $usuarioRepository;
        $this->service = $service;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if($this->dadosValidos['foto'])
        {
            $pasta = $this->service->handle('Fotos Perfis');
            $path = "$pasta/foto-perfil-{$this->dadosValidos['matricula_usuario']}";

            Storage::cloud()->put($path, base64_decode(preg_replace('/data:image\/(jpg|jpeg|png);base64,/', '', $this->dadosValidos['foto'])));

            $this->dadosValidos['foto_url'] = Storage::cloud()->url($path);
        }
        $this->usuarioRepository->create($this->dadosValidos);
    }
}
