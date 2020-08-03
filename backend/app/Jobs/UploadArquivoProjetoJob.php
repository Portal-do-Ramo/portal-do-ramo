<?php

namespace App\Jobs;

use App\Models\Projeto;
use App\Repositories\Interfaces\ProjetoRepositoryInterface;
use App\Services\BuscarNovoArquivoService;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class UploadArquivoProjetoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $projeto;
    protected $dadosValidos;
    protected $projetoRepository;
    protected $service;
    protected $buscaService;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Projeto $projeto, array $dadosValidos, ProjetoRepositoryInterface $projetoRepository, VerificarExistenciaDiretorioService $service, BuscarNovoArquivoService $buscaService)
    {
        $this->projeto = $projeto;
        $this->dadosValidos = $dadosValidos;
        $this->projetoRepository = $projetoRepository;
        $this->service = $service;
        $this->buscaService = $buscaService;
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

        Storage::cloud()->put("$pasta/{$this->dadosValidos['nome_arquivo']}", base64_decode(preg_replace('/data:application\/(pdf|vnd.openxmlformats-officedocument.(wordprocessingml.document|spreadsheetml.sheet)+)+;base64,/', '', $this->dadosValidos['arquivo'])));

        $arquivo = $this->buscaService->handle($pasta, $this->dadosValidos['nome_arquivo']);
        $this->dadosValidos['path'] = $arquivo['path'];
        $this->dadosValidos['extensao_arquivo'] = $this->getFileExtension($arquivo['mimetype']);

        $this->projetoRepository->addArquivo($this->projeto, $this->dadosValidos);
    }

    private function getFileExtension(string $mimetype)
    {
        return ['application/pdf' => 'pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xslx'][$mimetype];
    }
}
