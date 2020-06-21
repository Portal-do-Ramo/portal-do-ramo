<?php

namespace App\Providers;

use App\Models\Caixa;
use App\Models\DoacaoVaquinha;
use App\Models\Equipe;
use App\Models\Falta;
use App\Models\Feedback;
use App\Models\InscricaoPsi;
use App\Models\Pedidos\BasePedido;
use App\Models\Projeto;
use App\Models\Psi;
use App\Models\Reavaliacao;
use App\Models\RegistroDeCaixa;
use App\Models\Strike;
use App\Models\Usuario;
use App\Models\Vaquinha;
use App\Models\Evento;
use App\Policies\Financeiro\CaixaPolicy;
use App\Policies\Financeiro\DoacaoVaquinhaPolicy;
use App\Policies\Financeiro\RegistroDeCaixaPolicy;
use App\Policies\Financeiro\VaquinhaPolicy;
use App\Policies\Pessoas\FaltaPolicy;
use App\Policies\Pessoas\FeedbackPolicy;
use App\Policies\Pessoas\InscricaoPsiPolicy;
use App\Policies\Pessoas\PedidosPolicy;
use App\Policies\Pessoas\ReavaliacaoPolicy;
use App\Policies\Pessoas\StrikePolicy;
use App\Policies\Pessoas\UsuarioPolicy;
use App\Policies\Projetos\EquipePolicy;
use App\Policies\Projetos\ProjetoPolicy;
use App\Policies\Pessoas\PsiPolicy;
use App\Policies\Pessoas\EventoPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Usuario::class => UsuarioPolicy::class,
        Falta::class => FaltaPolicy::class,
        Strike::class => StrikePolicy::class,
        Reavaliacao::class => ReavaliacaoPolicy::class,
        Projeto::class => ProjetoPolicy::class,
        Equipe::class => EquipePolicy::class,
        Psi::class => PsiPolicy::class,
        InscricaoPsi::class => InscricaoPsiPolicy::class,
        BasePedido::class => PedidosPolicy::class,
        Vaquinha::class => VaquinhaPolicy::class,
        DoacaoVaquinha::class => DoacaoVaquinhaPolicy::class,
        Feedback::class => FeedbackPolicy::class,
        Caixa::class => CaixaPolicy::class,
        RegistroDeCaixa::class => RegistroDeCaixaPolicy::class,
        Evento::class => EventoPolicy:: class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
