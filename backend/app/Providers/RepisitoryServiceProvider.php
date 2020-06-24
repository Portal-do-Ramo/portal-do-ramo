<?php

namespace App\Providers;

use App\Repositories\Classes\CaixaRepository;
use App\Repositories\Classes\EquipeRepository;
use App\Repositories\Classes\FaltaRepository;
use App\Repositories\Classes\FeedbackRepository;
use App\Repositories\Classes\InscricaoPsiRepository;
use App\Repositories\Classes\PedidoRepository;
use App\Repositories\Classes\ProjetoRepository;
use App\Repositories\Classes\StrikeRepository;
use App\Repositories\Classes\UsuarioRepository;
use App\Repositories\Classes\PsiRepository;
use App\Repositories\Classes\RegistroDeCaixaRepository;
use App\Repositories\Classes\VaquinhaRepository;
use App\Repositories\Classes\EventoRepository;
use App\Repositories\Classes\ParceriaRepository;
use App\Repositories\Interfaces\CaixaRepositoryInterface;
use App\Repositories\Interfaces\EquipeRepositoryInterface;
use App\Repositories\Interfaces\FaltaRepositoryInterface;
use App\Repositories\Interfaces\FeedbackRepositoryInterface;
use App\Repositories\Interfaces\InscricaoPsiRepositoryInterface;
use App\Repositories\Interfaces\PedidoRepositoryInterface;
use App\Repositories\Interfaces\ProjetoRepositoryInterface;
use App\Repositories\Interfaces\StrikeRepositoryInterface;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use App\Repositories\Interfaces\PsiRepositoryInterface;
use App\Repositories\Interfaces\RegistroDeCaixaRepositoryInterface;
use App\Repositories\Interfaces\VaquinhaRepositoryInterface;
use App\Repositories\Interfaces\EventoRepositoryInterface;
use App\Repositories\Interfaces\ParceriaRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepisitoryServiceProvider extends ServiceProvider
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
        $this->app->bind(UsuarioRepositoryInterface::class, UsuarioRepository::class);
        $this->app->bind(ProjetoRepositoryInterface::class, ProjetoRepository::class);
        $this->app->bind(StrikeRepositoryInterface::class, StrikeRepository::class);
        $this->app->bind(FaltaRepositoryInterface::class, FaltaRepository::class);
        $this->app->bind(FeedbackRepositoryInterface::class, FeedbackRepository::class);
        $this->app->bind(EquipeRepositoryInterface::class, EquipeRepository::class);
        $this->app->bind(PsiRepositoryInterface::class, PsiRepository::class);
        $this->app->bind(InscricaoPsiRepositoryInterface::class, InscricaoPsiRepository::class);
        $this->app->bind(PedidoRepositoryInterface::class, PedidoRepository::class);
        $this->app->bind(VaquinhaRepositoryInterface::class, VaquinhaRepository::class);
        $this->app->bind(CaixaRepositoryInterface::class, CaixaRepository::class);
        $this->app->bind(RegistroDeCaixaRepositoryInterface::class, RegistroDeCaixaRepository::class);
        $this->app->bind(EventoRepositoryInterface::class, EventoRepository::class);
        $this->app->bind(ParceriaRepositoryInterface::class, ParceriaRepository::class);
    }
}
