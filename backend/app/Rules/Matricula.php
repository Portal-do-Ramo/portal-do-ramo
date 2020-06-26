<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Matricula implements Rule
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
        return preg_match('/^[0-9]{7}[A-Z]{3,5}$/', $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'O campo :attribute não está respeitando o formato de matrícula';
    }
}
