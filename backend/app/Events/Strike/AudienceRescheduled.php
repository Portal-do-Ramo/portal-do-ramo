<?php

namespace App\Events\Strike;

use App\Models\Strike;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AudienceRescheduled implements ShouldBroadcast
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
            'data_audiencia' => $this->strike->data_audiencia,
            'hora_audiencia' => $this->strike->hora_audiencia,
        ];
    }

    public function broadcastAs()
    {
        return 'audiencia.remarcada';
    }
}
