<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SituacaoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('situacoes')->insert(['nome' => 'Ativo']);
        DB::table('situacoes')->insert(['nome' => 'Inativo']);
        DB::table('situacoes')->insert(['nome' => 'Desligado']);
    }
}
