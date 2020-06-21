<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
use App\Broadcasting\Falta\FaltaUsuarioChannel;
use App\Broadcasting\Falta\TodasFaltasChannel;
use App\Broadcasting\Strike\StrikeUsuarioChannel;
use App\Broadcasting\Strike\TodosStrikesChannel;
use App\Broadcasting\Strike\TodosStrikesUsuarioChannel;
use App\Broadcasting\Usuario\PerfilCompletoUsuarioChannel;
use App\Broadcasting\Usuario\UsuarioChannel;

Broadcast::channel('usuario.{matricula}', UsuarioChannel::class);
Broadcast::channel('perfil-completo.{usuario}', PerfilCompletoUsuarioChannel::class);

Broadcast::channel('todas.faltas', TodasFaltasChannel::class);
Broadcast::channel('faltas.{usuario}', FaltaUsuarioChannel::class);

Broadcast::channel('todos.strikes', TodosStrikesChannel::class);
Broadcast::channel('strikes.{usuario}', StrikeUsuarioChannel::class);
Broadcast::channel('todos.strikes.{usuario}', TodosStrikesUsuarioChannel::class);