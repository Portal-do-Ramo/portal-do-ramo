<?php

namespace App\Models;

use App\Mail\TrocarSenhaMail;
use Illuminate\Support\Facades\Mail;

class UsuarioSistema extends Usuario
{    
    protected $table = 'usuarios';

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('situacao', fn($query) => $query->whereHas('situacao', fn($query) => $query->where('nome', '<>', 'Desligado')));
    }

    /**
     * Envio do e-mail para a alteração de senha, utilizando uma queue para que o processo de envio seja feito
     * assincronamente, passando para este um token, gerado no ForgotPasswordController, para identificação da
     * validade do link que será montado e enviado para o usuário
     *
     * @param string $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $url = config('app.url') . "/new-password?token=$token&email={$this->email}";
        Mail::to($this->email)->queue(new TrocarSenhaMail($url, $this));
    }

    /**
     * Definindo para o Laravel qual coluna da tabela membros equivale a senha padrão dele
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->senha;
    }
}
