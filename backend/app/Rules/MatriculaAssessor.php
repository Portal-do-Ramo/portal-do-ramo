<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class MatriculaAssessor implements Rule
{
    protected $matriculaAssessor;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(string $matriculaAssessor)
    {
        $this->matriculaAssessor = $matriculaAssessor;
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
        return $value !== $this->matriculaAssessor;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'O campo :attribute já corresponde ao assessor da equipe';
    }
}
