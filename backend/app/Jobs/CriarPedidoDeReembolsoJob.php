<?php

namespace App\Jobs;

use App\Models\Pedidos\PedidoDeCompra;
use App\Models\UsuarioSistema;
use App\Repositories\Interfaces\PedidoRepositoryInterface;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class CriarPedidoDeReembolsoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $usuario;
    protected $pedidoDeCompra;
    protected $fotoCodificada;
    protected $pedidoRepository;
    protected $service;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(UsuarioSistema $usuario, PedidoDeCompra $pedidoDeCompra, array $dadosValidos, PedidoRepositoryInterface $pedidoRepository, VerificarExistenciaDiretorioService $service)
    {
        $this->usuario = $usuario;
        $this->pedidoDeCompra = $pedidoDeCompra;
        $this->fotoCodificada = $dadosValidos['foto_comprovante'];
        $this->pedidoRepository = $pedidoRepository;
        $this->service = $service;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $pasta = $this->service->handle('Comprovantes Reembolso');
        $path = "$pasta/comprovante-{$this->uuid}";

        Storage::cloud()->put($path, base64_decode($this->fotoCodificada));

        $this->pedidoRepository->criarPedidoDeReembolso($this->pedidoDeCompra, Storage::cloud()->url($path), $this->usuario);
    }
}
