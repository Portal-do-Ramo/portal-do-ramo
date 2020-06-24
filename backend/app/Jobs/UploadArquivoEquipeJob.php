<?php

namespace App\Jobs;

use App\Models\Equipe;
use App\Repositories\Interfaces\EquipeRepositoryInterface;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class UploadArquivoEquipeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $equipe;
    protected $dadosValidos;
    protected $equipeRepository;
    protected $service;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Equipe $equipe, array $dadosValidos, EquipeRepositoryInterface $equipeRepository, VerificarExistenciaDiretorioService $service)
    {
        $this->equipe = $equipe;
        $this->dadosValidos = $dadosValidos;
        $this->projetoRepository = $equipeRepository;
        $this->service = $service;
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
        $pasta = $this->service->handle('Arquivos', $pastaEquipe);

        $this->dadosValidos['path'] = $pasta;

        Storage::cloud()->put("{$this->dadosValidos['path']}/{$this->dadosValidos['nome_arquivo']}", base64_decode($this->dadosValidos['arquivo']));
        $this->projetoRepository->addArquivo($this->equipe, $this->dadosValidos);
    }
}
