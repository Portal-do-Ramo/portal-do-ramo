<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HierarquiasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('hierarquias')->insert(['nome' => 'Membro', 'diretoria' => 0]);
        DB::table('hierarquias')->insert(['nome' => 'Marketing', 'diretoria' => 0]);
        DB::table('hierarquias')->insert(['nome' => 'Líder de Projeto', 'diretoria' => 0]);
        DB::table('hierarquias')->insert(['nome' => 'Assessor de Gestão', 'diretoria' => 0]);
        DB::table('hierarquias')->insert(['nome' => 'Assessor de Coordenador', 'diretoria' => 0]);
        DB::table('hierarquias')->insert(['nome' => 'Assessor de Presidência', 'diretoria' => 0]);
        DB::table('hierarquias')->insert(['nome' => 'Coordenador', 'diretoria' => 1]);
        DB::table('hierarquias')->insert(['nome' => 'Diretor de Marketing', 'diretoria' => 1]);
        DB::table('hierarquias')->insert(['nome' => 'Diretor de Projetos', 'diretoria' => 1]);
        DB::table('hierarquias')->insert(['nome' => 'Diretor de Gestão de Pessoas', 'diretoria' => 1]);
        DB::table('hierarquias')->insert(['nome' => 'Diretor Financeiro', 'diretoria' => 1]);
        DB::table('hierarquias')->insert(['nome' => 'Vice-Presidente', 'diretoria' => 1]);
        DB::table('hierarquias')->insert(['nome' => 'Presidente', 'diretoria' => 1]);
    }
}
