<?php

namespace App\Mail\Strike;

use App\Models\Strike;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AudienciaMarcadaMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $strike;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Strike $strike)
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
        return $this->subject('Audiência marcada')->markdown('mail.strike.audienciamarcada');
    }
}
