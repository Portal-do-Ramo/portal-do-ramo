<?php

namespace App\Traits;

use Illuminate\Pipeline\Pipeline;;

trait Filtravel
{
    protected static function getQueryFiltrada()
    {
        return app(Pipeline::class)
            ->send(self::getQueryFormatada())
            ->through(self::getFiltros())
            ->thenReturn();
    } 

    abstract public static function getQueryFormatada();

    abstract protected static function getFiltros();
}