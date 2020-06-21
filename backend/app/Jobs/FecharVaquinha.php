<?php

namespace App\Jobs;

use App\Models\RegistroDeCaixa;
use App\Models\Vaquinha;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FecharVaquinha implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $vaquinha;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Vaquinha $vaquinha)
    {
        $this->vaquinha = $vaquinha;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        RegistroDeCaixa::createMain($this->arrayRegistroCaixa($this->vaquinha));
    }

    private function arrayRegistroCaixa(Vaquinha $vaquinha)
    {
        return [
            'data' => $vaquinha->data_fim->format('d/m/Y'),
            'valor' => $vaquinha->valorTotal,
            'exclusivo' => false,
            'caixa_relacionado' => null,
            'descricao' => "Arrecadação vaquinha {$vaquinha->data_inicio->format('m/Y')}"
        ];
    }
}
