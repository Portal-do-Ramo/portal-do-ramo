<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Parceria;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

$factory->define(Parceria::class, function (Faker $faker) {
    return [
        'nome_empresa' => $faker->unique()->company,
        'link_site_empresa' => $faker->url,
        'beneficios' => $faker->text,
        'equipes_beneficiadas'=> fn() => DB::table('equipes')->select('nome_equipe_slug')->limit(random_int(1, DB::table('equipes')->count()))->get()->toArray(),
        'como_encaixamos' => $faker->text,
        'email_empresa' => $faker->unique()->companyEmail,
        'telefone_empresa' => "(21) 9{$faker->numberBetween(1000, 9999)}-{$faker->numberBetween(1000, 9999)}",
        'membro_solicitou' => fn() => DB::table('usuarios')->get()->random()->matricula
    ];
});
