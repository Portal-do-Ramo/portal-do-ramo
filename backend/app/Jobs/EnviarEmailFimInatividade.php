<?php

namespace App\Jobs;

use App\Mail\FimInatividadeMail;
use App\Models\Usuario;
use App\Notifications\Pedidos\PedidoDeInatividade\FimPeriodoInatividadeNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class EnviarEmailFimInatividade implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $usuario;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Usuario $usuario)
    {
        $this->usuario = $usuario;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->usuario->notify(new FimPeriodoInatividadeNotification);
    }
}
