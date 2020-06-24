<?php

namespace App\Jobs;

use App\Models\Arquivo;
use App\Models\Equipe;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class EditarArquivoEquipeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $equipe;
    protected $arquivo;
    protected $dadosValidos;
    protected $service;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Equipe $equipe, Arquivo $arquivo, array $dadosValidos, VerificarExistenciaDiretorioService $service)
    {
        $this->equipe = $equipe;
        $this->arquivo = $arquivo;
        $this->dadosValidos = $dadosValidos;
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

        Storage::cloud()->put("$pasta/{$this->arquivo->nome}", base64_decode($this->dadosValidos['arquivo']));
    }
}
