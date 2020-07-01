<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\LoginResource;
use Illuminate\Support\Facades\Auth;

class LoginController extends ApiController
{
    /**
     * Construtor do controlador, que define que o usuário para acessar os métodos logout, me e refresh,
     * tem de estar autenticado
     *
     */
    public function __construct()
    {
        $this->middleware('auth')->only('logout');
    }

     /**
     * Retorna um token JWT, a partir da autenticação do usuário
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        if (!$token = Auth::attempt($this->credenciais($request->validated())))
            return response()->json(['erro' => 'Dados inválidos'], 422);

        return response()->json(['token_de_acesso' => $token, 'user' => new LoginResource(Auth::user())], 200);
    }

    /**
     * Realiza o logout do usuário, invalidando o token de autenticação
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    /**
     * Cria o array com os índices necessários para a realização do login, baseado no conteúdo da request validada
     *
     * @param array $dadosValidos
     * @return array
     */
    protected function credenciais($dadosValidos)
    {
        return ['matricula' => $dadosValidos['matricula_usuario'], 'password' => $dadosValidos['senha_usuario']];
    }
}
