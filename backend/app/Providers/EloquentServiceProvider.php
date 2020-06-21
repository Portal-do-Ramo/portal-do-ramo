<?php

namespace App\Providers;

use App\Models\DoacaoVaquinha;
use App\Models\Equipe;
use App\Models\Falta;
use App\Models\InscricaoPsi;
use App\Models\Pedidos\PedidoDeCompra;
use App\Models\Pedidos\PedidoDeDesligamento;
use App\Models\Pedidos\PedidoDeInatividade;
use App\Models\Pedidos\PedidoDeReembolso;
use App\Models\Pedidos\PedidoDeSaidaDeProjeto;
use App\Models\Psi;
use App\Models\Strike;
use App\Models\Reavaliacao;
use App\Models\RegistroDeCaixa;
use App\Models\Vaquinha;
use App\Observers\DoacaoVaquinhaObserver;
use App\Observers\EquipeObserver;
use App\Observers\FaltaObserver;
use App\Observers\InscricaoPsiObserver;
use App\Observers\Pedidos\PedidoDeCompraObserver;
use App\Observers\Pedidos\PedidoDeDesligamentoObserver;
use App\Observers\Pedidos\PedidoDeInatividadeObserver;
use App\Observers\Pedidos\PedidoDeReembolsoObserver;
use App\Observers\Pedidos\PedidoDeSaidaDeProjetoObserver;
use App\Observers\PsiObserver;
use App\Observers\StrikeObserver;
use App\Observers\ReavaliacaoObserver;
use App\Observers\RegistroDeCaixaObserver;
use App\Observers\VaquinhaObserver;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class EloquentServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Strike::observe(StrikeObserver::class);
        Reavaliacao::observe(ReavaliacaoObserver::class);
        Falta::observe(FaltaObserver::class);
        Psi::observe(PsiObserver::class);
        InscricaoPsi::observe(InscricaoPsiObserver::class);
        PedidoDeCompra::observe(PedidoDeCompraObserver::class);
        PedidoDeDesligamento::observe(PedidoDeDesligamentoObserver::class);
        PedidoDeInatividade::observe(PedidoDeInatividadeObserver::class);
        PedidoDeSaidaDeProjeto::observe(PedidoDeSaidaDeProjetoObserver::class);
        PedidoDeReembolso::observe(PedidoDeReembolsoObserver::class);
        Vaquinha::observe(VaquinhaObserver::class);
        DoacaoVaquinha::observe(DoacaoVaquinhaObserver::class);
        RegistroDeCaixa::observe(RegistroDeCaixaObserver::class);
        Equipe::observe(EquipeObserver::class);

        Relation::morphMap(['Equipe' => 'App\Models\Equipe', 'Projeto' => 'App\Models\Projeto']);
    }
}
