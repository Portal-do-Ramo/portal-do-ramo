<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Parceria;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

$factory->define(Parceria::class, function (Faker $faker) {
    return [
        'nome_empresa' => $faker->unique()->company,
        'foto_url' => $faker->imageUrl(),
        'link_site_empresa' => $faker->url,
        'beneficios' => $faker->text,
        'equipes_beneficiadas'=> fn() => DB::table('equipes')->select('nome_equipe_slug')->limit(random_int(1, DB::table('equipes')->count()))->get()->pluck('nome_equipe_slug')->toArray(),
        'como_encaixamos' => $faker->text,
        'email_empresa' => $faker->unique()->companyEmail,
        'telefone_empresa' => $faker->regexify('/(21) 9[0-9]{4}-{0-9}[4]/'),
        'membro_solicitou' => fn() => DB::table('usuarios')->get()->random()->matricula,
        'nivel' => $faker->randomElement(['Ouro', 'Prata', 'Bronze'])
    ];
});
