<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Carbon;

class EntreDatas implements Rule
{

    protected $dataInicio;
    protected $dataFim;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($dataInicio, $dataFim)
    {
        $this->dataInicio = $dataInicio;
        $this->dataFim = $dataFim;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $value = Carbon::createFromFormat('d/m/Y', $value);
        return $this->dataInicio < $value and $value < $this->dataFim; 
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "O campo :attribute deve estar entre as datas: {$this->dataInicio->format('d/m/Y')} e {$this->dataFim->format('d/m/Y')}";
    }
}
