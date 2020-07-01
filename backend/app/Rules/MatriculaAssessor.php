<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class MatriculaAssessor implements Rule
{
    protected $assessor;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($assessor)
    {
        $this->assessor = $assessor;
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
        if($this->assessor) return $value !== $this->assessor->matricula;
        else return true;
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
