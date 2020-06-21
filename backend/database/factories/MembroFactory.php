<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Models\Membro;

$factory->define(Membro::class, function (Faker $faker)  {
    return [
        'matricula_usuario' => function() {
            return factory(App\Models\Usuario::class)->create()->matricula;
        },
        'telefones->telefone_principal' =>"(21) 9{$faker->numberBetween(1000, 9999)}-{$faker->numberBetween(1000, 9999)}",
        'curso_id' => $faker->numberBetween(1, 12),
        'pagante' => 0,
        'data_nascimento' => $faker->dateTimeBetween('-25 years', '-18 years')->format('d/m/Y')
    ];
});
