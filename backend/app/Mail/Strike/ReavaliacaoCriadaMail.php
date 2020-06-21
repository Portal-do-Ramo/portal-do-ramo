<?php

namespace App\Mail\Strike;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReavaliacaoCriadaMail extends Mailable  
{
    use Queueable, SerializesModels;

    public $membro;
    public $reavaliacao;
    public $strike;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($membro, $reavaliacao)
    {
        $this->membro = $membro;
        $this->reavaliacao = $reavaliacao;
        $this->strike = $reavaliacao->strike;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Reavaliação criada')->markdown('mail.strike.reavaliacaocriada');
    }
}
