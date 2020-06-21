<?php

namespace App\Events\Strike;

use App\Models\Strike;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StrikeRemoved implements ShouldBroadcast
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
            new PrivateChannel("strikes.{$this->strike->membro_recebeu}"),
            new PrivateChannel("todos.strikes.{$this->strike->membro_recebeu}")
        ];
    }

    public function broadcastWith()
    {
        return ['uuid' => $this->strike->uuid];
    }

    public function broadcastAs()
    {
        return 'strike.retirado';
    }
}
