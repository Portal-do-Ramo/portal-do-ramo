<?php

namespace App\Jobs;

use App\Models\Arquivo;
use App\Models\Projeto;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class EditarArquivoProjetoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $projeto;
    protected $arquivo;
    protected $dadosValidos;
    protected $service;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Projeto $projeto, Arquivo $arquivo, array $dadosValidos, VerificarExistenciaDiretorioService $service)
    {
        $this->projeto = $projeto;
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
        $pastaEquipe = $this->service->handle($this->projeto->equipe->nome_equipe, $pastaEquipes);
        $pastaProjetos = $this->service->handle('Projetos', $pastaEquipe);
        $pasta = $this->service->handle($this->projeto->nome_projeto, $pastaProjetos);


        Storage::cloud()->put("$pasta/{$this->arquivo->nome}", base64_decode($this->dadosValidos['arquivo']));
    }
}
