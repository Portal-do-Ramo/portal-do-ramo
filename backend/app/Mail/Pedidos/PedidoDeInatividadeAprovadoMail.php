<?php

namespace App\Mail\Pedidos;

use App\Models\Pedidos\PedidoDeInatividade;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PedidoDeInatividadeAprovadoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $pedidoDeInatividade;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(PedidoDeInatividade $pedidoDeInatividade)
    {
        $this->pedidoDeInatividade = $pedidoDeInatividade;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Pedido de desligamento Ramo Estudantil IEEE CEFET/RJ aprovado')->markdown('mail.pedidos.pedidodeinatividadeaprovado');
    }
}
