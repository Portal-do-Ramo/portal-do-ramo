<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Dotenv\Validator;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '/';

    protected function rules() {
        return [
            'token' => 'required',
            'email' => 'required|email|exists:password_resets',
            'senha' => 'required'
        ];
    }

    protected function resetPassword($user, $password)
    {
        $this->setUserPassword($user, $password);

        $user->save();

        $this->guard()->login($user);
    }

    protected function setUserPassword($user, $password)
    {
        $user->senha = $password;
    }

    protected function credentials(Request $request)
    {   
        return $request->only('email', 'token') + ['password' => $request->senha];
    } 

    public function reset(Request $request)
    {
        $request->validate($this->rules());

        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );

        return $response == Password::PASSWORD_RESET
            ? response()->json("Senha alterada com sucesso", 200) 
            : response()->json("Erro ao trocar a senha", 400);
    }
}
