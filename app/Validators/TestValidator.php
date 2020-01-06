<?php

namespace App\Validators;

use Illuminate\Support\Facades\Validator;
use szana8\Laraflow\Validator\LaraflowValidatorInterface;

class TestValidator implements LaraflowValidatorInterface
{
    /**
     * Validate the attributes with the given rules.
     *
     * @param array $attributes
     * @param array $rules
     * @return mixed
     */
    public function validate(array $attributes, array $rules)
    {
        //
        dd('It Works');

        return true;
    }
}
