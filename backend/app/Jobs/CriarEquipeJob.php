<?php

namespace App\Jobs;

use App\Repositories\Interfaces\EquipeRepositoryInterface;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CriarEquipeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    protected $dadosValidos;
    protected $equipeRepository;
    protected $service;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $dadosValidos, EquipeRepositoryInterface $equipeRepository, VerificarExistenciaDiretorioService $service)
    {
        $this->dadosValidos = $dadosValidos;
        $this->equipeRepository = $equipeRepository;
        $this->service = $service;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if($this->dadosValidos['logo_equipe']) {
            $pastaEquipes = $this->service->handle('Equipes');
            $pastaEquipe = $this->service->handle($this->dadosValidos['nome_equipe'], $pastaEquipes);
            $path = "$pastaEquipe/logo-".Str::slug($this->dadosValidos['nome_equipe']);

            Storage::cloud()->put($path, base64_decode(preg_replace('/data:image\/(jpg|jpeg|png);base64,/', '', $this->dadosValidos['logo_equipe'])));
            $this->dadosValidos['foto_url'] = Storage::cloud()->url($path);
        }

        $this->equipeRepository->create($this->dadosValidos);
    }
}
