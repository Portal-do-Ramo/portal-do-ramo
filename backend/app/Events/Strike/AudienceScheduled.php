<?php

namespace App\Events\Strike;

use App\Models\Strike;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AudienceScheduled implements ShouldBroadcast
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

    public function broadcastOn()
    {
        return [
            new PrivateChannel('todos.strikes'),
            new PrivateChannel("strikes.{$this->strike->membroAplicou->matricula}"),
            new PrivateChannel("todos.strikes.{$this->strike->membroAplicou->matricula}"),
            new PrivateChannel("strikes.{$this->strike->membroRecebeu->matricula}"),
            new PrivateChannel("todos.strikes.{$this->strike->membroRecebeu->matricula}"),
        ];
    }

    public function broadcastWith()
    {
        return [
            'uuid' => $this->strike->uuid,
            'motivo' => $this->strike->motivo,
            'data_audiencia_solicitada' => $this->strike->data_audiencia_solicitada,
            'data_audiencia' => $this->strike->data_audiencia,
            'hora_audiencia' => $this->strike->hora_audiencia,
            'data_aprovado' => $this->strike->data_aprovado->format('d/m/Y'),
            'strikes.data_criado' => $this->strike->data_criado->format('d/m/Y'),
            'matricula_membro_aplicou' => $this->strike->membro_aplicou, 
            'nome_membro_aplicou' => $this->strike->membroAplicou->nome_completo,
            'matricula_membro_recebeu' => $this->strike->membro_recebeu, 
            'nome_membro_recebeu' => $this->strike->membroRecebeu->nome_completo
        ];
    }

    public function broadcastAs()
    {
        return 'audiencia.aprovada';
    }
}
