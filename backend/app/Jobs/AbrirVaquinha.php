<?php

namespace App\Jobs;

use App\Models\Usuario;
use App\Models\Vaquinha;
use App\Notifications\Vaquinha\NotificarVaquinhaAbertaNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

class AbrirVaquinha implements ShouldQueue
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
        Notification::send(Usuario::whereHas('situacao', fn($query) => $query->where('nome', 'Ativo'))->get(), new NotificarVaquinhaAbertaNotification($this->vaquinha));
    }
}
