<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class SomatorioPorcentagemOrcamento implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return array_reduce($value, fn($carry, $item) => $carry + $item['porcentagem'], 0) === 100;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'O somatório das porcentagem dos caixas deve ser igual a 100%';
    }
}
