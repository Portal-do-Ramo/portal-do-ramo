<?php

namespace App\Jobs;

use App\Models\Equipe;
use App\Repositories\Interfaces\EquipeRepositoryInterface;
use App\Services\BuscarNovoArquivoService;
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
    protected $buscaService;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Equipe $equipe, array $dadosValidos, EquipeRepositoryInterface $equipeRepository, VerificarExistenciaDiretorioService $service, BuscarNovoArquivoService $buscaService)
    {
        $this->equipe = $equipe;
        $this->dadosValidos = $dadosValidos;
        $this->equipeRepository = $equipeRepository;
        $this->buscaService = $buscaService;
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

        Storage::cloud()->put("$pasta/{$this->dadosValidos['nome_arquivo']}", base64_decode($this->dadosValidos['arquivo']));

        $arquivo = $this->buscaService->handle($pasta, $this->dadosValidos['nome_arquivo']);
        $this->dadosValidos['path'] = $arquivo['path'];
        $this->dadosValidos['extensao_arquivo'] = $this->getFileExtension($arquivo['mimetype']);

        $this->equipeRepository->addArquivo($this->equipe, $this->dadosValidos);
    }

    private function getFileExtension(string $mimetype)
    {
        return ['application/pdf' => 'pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xslx'][$mimetype];
    }
}
