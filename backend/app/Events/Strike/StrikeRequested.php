<?php

namespace App\Events\Strike;

use App\Models\Strike;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StrikeRequested implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $strike;
    public $broadcastQueue = 'broadcast';

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Strike $strike)
    {
        $this->strike = $strike;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return [
            new PrivateChannel('todos.strikes'), 
            new PrivateChannel("strikes.{$this->strike->membro_aplicou}"),
            new PrivateChannel("todos.strikes.{$this->strike->membro_aplicou}"),
            new PrivateChannel("todos.strikes.{$this->strike->membro_recebeu}")
        ];
    }

    public function broadcastWith()
    {
        return [
            'uuid' => $this->strike->uuid,
            'matricula_membro_recebeu' => $this->strike->membro_recebeu,
            'nome_membro_recebeu' => $this->strike->membroRecebeu->nome_completo,
            'situacao' => $this->strike->situacao,
            'aprovado' => false,
            'data_aprovado' => null,
            'motivo' => $this->strike->motivo,
            'audiencia_solicitada' => false,
            'data_audiencia_solicitada' => null,
            'data_audiencia' => null,
            'hora_audiencia' => null,
            'data_criado' => $this->strike->data_criado,
        ];
    }

    public function broadcastAs()
    {
        return 'strike.solicitado';
    }
}
