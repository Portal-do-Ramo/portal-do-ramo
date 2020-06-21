<?php

namespace App\Jobs;

use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class UploadFotoEquipe implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $dadosValidos;
    protected $service;
    protected $path;
    protected $equipe;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($equipe, array $dadosValidos, VerificarExistenciaDiretorioService $service)
    {
        $this->dadosValidos = $dadosValidos;
        $this->service = $service;
        $this->equipe = $equipe;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $pasta = $this->service->handle('Logos Equipes');
        $this->path = "$pasta/logo-equipe-{$this->equipe}";

        Storage::cloud()->put($this->path, base64_decode($this->dadosValidos['logo_equipe']));
    }

    public function getResponse()
    {
        return Storage::cloud()->url($this->path);
    }
}
