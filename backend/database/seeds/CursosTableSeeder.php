<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CursosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cursos')->insert(['nome' => 'Administação']);
        DB::table('cursos')->insert(['nome' => 'Ciência da Computação']);
        DB::table('cursos')->insert(['nome' => 'Engenharia Ambiental']);
        DB::table('cursos')->insert(['nome' => 'Engenharia Civil']);
        DB::table('cursos')->insert(['nome' => 'Engenharia de Controle e Automação']);
        DB::table('cursos')->insert(['nome' => 'Engenharia de Produção']);
        DB::table('cursos')->insert(['nome' => 'Engenharia de Telecomunicações']);
        DB::table('cursos')->insert(['nome' => 'Engenharia Elétrica']);
        DB::table('cursos')->insert(['nome' => 'Engenharia Eletrônica']);
        DB::table('cursos')->insert(['nome' => 'Engenharia Mecânica']);
        DB::table('cursos')->insert(['nome' => 'Física']);
        DB::table('cursos')->insert(['nome' => 'LEANI']);
    }
}
