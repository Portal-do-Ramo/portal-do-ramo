<?php

namespace App\Mail\Pedidos;

use App\Models\Pedidos\PedidoDeDesligamento;
use App\Models\Usuario;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PedidoDeDesligamentoAprovadoMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $pedidoDeDesligamento;
    public $usuario;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Usuario $usuario, PedidoDeDesligamento $pedidoDeDesligamento)
    {
        $this->usuario = $usuario;
        $this->pedidoDeDesligamento = $pedidoDeDesligamento;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Pedido de desligamento Ramo Estudantil IEEE CEFET/RJ aprovado')->markdown('mail.pedidos.pedidodedesligamentoaprovado');
    }
}
