<?php

namespace App\Http\Controllers\Usuario;

use App\Exports\ListaPresencaExport;
use App\Exports\UsuariosDesligadosExport;
use App\Exports\UsuariosInativosExport;
use App\Exports\UsuariosPagantesExport;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;

class UsuarioExportController extends AbstractUsuarioController
{
    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        parent::__construct($usuarioRepository);
    }

    public function listaPresenca()
    {
        return new ListaPresencaExport($this->usuarioRepository);
    }

    public function listaMembrosPagantes()
    {
        return new UsuariosPagantesExport($this->usuarioRepository);
    }

    public function listaMembrosInativos()
    {
        return new UsuariosInativosExport($this->usuarioRepository);
    }

    public function listaMembrosDesligados()
    {
        return new UsuariosDesligadosExport($this->usuarioRepository);
    }
}
