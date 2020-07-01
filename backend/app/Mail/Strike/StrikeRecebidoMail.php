<?php

namespace App\Mail\Strike;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class StrikeRecebidoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $strike;
    
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($strike)
    {
        $this->strike = $strike;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Novo strike recebido')->markdown('mail.strike.strikerecebido');
    }
}
