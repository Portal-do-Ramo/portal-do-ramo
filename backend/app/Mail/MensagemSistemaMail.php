<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MensagemSistemaMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $mensagem;
    public $assunto;
    protected $usuario;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mensagem, $assunto, $usuario)
    {
        $this->mensagem = $mensagem;
        $this->assunto = $assunto;
        $this->usuario = $usuario;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->assunto)->from($this->usuario->email, $this->usuario->nome_completo)->replyTo($this->usuario->email, $this->usuario->nome_completo)->markdown('mail.mensagemsistema');
    }
}
