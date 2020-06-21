<?php

namespace App\Filtros;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

abstract class BaseFiltro 
{
    public function handle(Builder $request, Closure $next)
    {
        return $next($request)->when(request()->has($this->getNomeFiltro()), $this->aplicarFiltro());
    }

    protected function getNomeFiltro()
    {
        return Str::snake(class_basename($this));
    }

    abstract protected function aplicarFiltro();
}