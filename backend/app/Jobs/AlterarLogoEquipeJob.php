<?php

namespace App\Jobs;

use App\Models\Equipe;
use App\Repositories\Interfaces\EquipeRepositoryInterface;
use App\Services\DeletarArquivoService;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class AlterarLogoEquipeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $equipe;
    protected $logo;
    protected $equipeRepository;
    protected $service;
    protected $deletarService;
    protected $url;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Equipe $equipe, array $dadosValidos, EquipeRepositoryInterface $equipeRepository, VerificarExistenciaDiretorioService $service, DeletarArquivoService $deletarService)
    {
        $this->equipe = $equipe;
        $this->logo = $dadosValidos['logo_equipe'];
        $this->equipeRepository = $equipeRepository;
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
        $pastaEquipes = $this->service->handle('Equipes');
        $pastaEquipe = $this->service->handle($this->equipe->nome_equipe, $pastaEquipes);
        $path = "$pastaEquipe/logo-equipe-{$this->equipe->nome_equipe_slug}";

        $this->deletarService->handle($pastaEquipe, "logo-equipe-{$this->equipe->nome_equipe_slug}");

        Storage::cloud()->put($path, base64_decode($this->logo));
        $this->url = Storage::cloud()->url($path);
        $this->dadosValidos['foto_url'] = $this->url;
    }
}
