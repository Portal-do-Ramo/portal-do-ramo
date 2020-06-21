<?php

namespace App\Events\Falta;

use App\Models\Falta;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class FaltaCriada implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $falta;
    public $broadcastQueue = 'broadcast';

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Falta $falta)
    {
        $this->falta = $falta;
    }

    public function broadcastOn()
    {
        return [
            new PrivateChannel('todas.faltas'), 
            new PrivateChannel("faltas.{$this->falta->membro_recebeu}"), 
            new PrivateChannel("perfil-completo.{$this->falta->membro_recebeu}")
        ];
    }

    public function broadcasWith()
    {
        return [
            'uuid' => $this->falta->uuid,
            'data' => $this->falta->descricao,
            'descricao' => $this->falta->descricao,
            'tipo' => Str::slug($this->falta->tipoFalta->nome, '_'),
            'nome_projeto' => $this->falta->projeto->nome_projeto,
            'nome_projeto_slug' => $this->projeto->nome_projeto_slug
        ];
    }
    
    public function broadcastAs()
    {
        return 'nova.falta';
    }
}
