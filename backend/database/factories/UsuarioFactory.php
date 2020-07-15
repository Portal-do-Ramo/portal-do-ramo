<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Usuario;
use Faker\Generator as Faker;

$factory->define(Usuario::class, function (Faker $faker) {
    return [
        'matricula' => $faker->regexify('/[0-9]{7}[A-Z]{3,5}/'),
        'senha' => 'i3ecefetrj',
        'nome_completo' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'hierarquia_id' => $faker->numberBetween(1, 13),
        'foto_url' => 'https://image.flaticon.com/icons/png/512/306/306232.png'
    ];
});
