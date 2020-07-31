<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Models\Membro;

$factory->define(Membro::class, function (Faker $faker)  {
    return [
        'matricula_usuario' => fn() => factory(App\Models\Usuario::class)->create()->matricula,
        'telefones->telefone_principal' => $faker->regexify('/(21) 9[0-9]{4}-[0-9]{4}/'),
        'curso_id' => $faker->numberBetween(1, 12),
        'pagante' => 0,
        'data_nascimento' => $faker->dateTimeBetween('-25 years', '-18 years')->format('d/m/Y')
    ];
});
