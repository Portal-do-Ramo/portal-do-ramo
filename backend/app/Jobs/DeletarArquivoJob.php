<?php

namespace App\Jobs;

use App\Models\Arquivo;
use App\Services\DeletarArquivoService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeletarArquivoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $arquivo;
    protected $deleteService;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Arquivo $arquivo, DeletarArquivoService $deleteService)
    {
        $this->arquivo = $arquivo;
        $this->deleteService = $deleteService;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->deleteService->handle($this->arquivo->path, $this->arquivo->nome);
        $this->arquivo->delete();
    }
}
