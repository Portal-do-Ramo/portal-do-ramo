<?php

namespace App\Mail\Strike;

use App\Models\Strike;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;

class AudienciaRemarcadaMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $strike;
    public $dataOriginal;
    public $horaOriginal;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Strike $strike)
    {
        $this->strike = $strike;
        $this->dataOriginal = Carbon::parse($strike->getRawOriginal('data_audiencia'))->format('d/m/Y');
        $this->horaOriginal = $strike->getOriginal('hora_audiencia');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Audiência remarcada')->markdown('mail.strike.audienciaremarcada');
    }
}
