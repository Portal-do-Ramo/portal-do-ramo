<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Parceria;
use Faker\Generator as Faker;

$factory->define(Parceria::class, function (Faker $faker) {
    return [
        'nome_empresa' => 'Empresa '.$faker->unique()->name.' S/A',
        'link_site_empresa' => 'google.com',
        'beneficios' => $faker->text,
        'equipes_beneficiadas'=> function() {
            $equipes = DB::table('equipes')->get();
            $equipesRandom = $equipes->random(random_int(1, DB::table('equipes')->count()));
            $resp = [];
            foreach($equipesRandom as $key => $equipe)
                $resp[$key] = $equipe->nome_equipe_slug;
            return $resp;
        },
        'como_encaixamos' => $faker->text,
        'email_empresa' => $faker->unique()->safeEmail,
        'telefone_empresa' => "(21) 9{$faker->numberBetween(1000, 9999)}-{$faker->numberBetween(1000, 9999)}",
        'membro_solicitou' => function() {
            return DB::table('usuarios')->get()->random()->matricula;
        }
    ];
});
