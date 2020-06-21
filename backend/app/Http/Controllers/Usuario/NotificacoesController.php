<?php

namespace App\Http\Controllers\Usuario;

use App\Mail\MensagemSistemaMail;
use App\Models\CustomNotification;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class NotificacoesController extends AbstractUsuarioController
{
    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        parent::__construct($usuarioRepository);
    }

    public function minhasNotificacoes()
    {
        return $this->usuarioRepository->minhasNotificacoes();
    }

    public function enviarMensagem(Request $request)
    {
        $dadosValidos = $request->validate($this->rules());

        Mail::to($dadosValidos['destinatarios'])->queue((new MensagemSistemaMail($dadosValidos['mensagem'], $dadosValidos['assunto']))->onQueue('mensagem-sistema-mail'));

        return response()->json('Mensagem enviada com sucesso', 200);
    }

    private function rules()
    {
        return [
            'destinatarios' => 'required|array',
            'destinatarios.*' => 'email',
            'assunto' => 'required',
            'mensagem' => 'required'
        ];
    }

    public function marcarNotificacaoComoLida(CustomNotification $notificacao)
    {
        $notificacao->markAsRead();
        return response()->json('Notificação marcada como lida com sucesso', 200);
    }
}
