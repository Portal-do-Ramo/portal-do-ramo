<?php

namespace App\Traits;

trait UsesSerializedDates
{
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('d/m/Y');
    }
}