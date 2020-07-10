<?php

namespace App\Jobs;

use App\Mail\Strike\DesligadoAcumuloStrikesMail;
use App\Models\Strike;
use App\Models\UsuarioAtivo;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class DesligarMembroStrikesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $strike;
    protected $usuarioRepository;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Strike $strike, UsuarioRepositoryInterface $usuarioRepository)
    {
        $this->strike = $strike;
        $this->usuarioRepository = $usuarioRepository;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if($this->strike->situacao === 'Aprovado') {
            $membroRecebeu = $this->strike->membroRecebeu;

            $this->usuarioRepository->setDesligado($membroRecebeu);
            Mail::to(UsuarioAtivo::diretoria()->get()->push($membroRecebeu)->unique('matricula')->map(fn($usuario) => ['name' => $usuario->nome_completo, 'email' => $usuario->email]))->queue(new DesligadoAcumuloStrikesMail($membroRecebeu));
        }
    }
}
