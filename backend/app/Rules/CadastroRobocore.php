<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CadastroRobocore implements Rule
{
    protected $cadastroCorreto;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($email)
    {
        $this->cadastroCorreto = substr($email, 0, strpos($email, '@'));
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
        return $value == $this->cadastroCorreto;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "O campo :attribute está errado, o correto deveria ser: {$this->cadastroCorreto}";
    }
}
