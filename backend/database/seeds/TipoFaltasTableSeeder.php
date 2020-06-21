<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoFaltasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_faltas')->insert(['nome' => 'Exposup', 'quantidade_para_strike' => 1]);
        DB::table('tipo_faltas')->insert(['nome' => 'Reunião Geral', 'quantidade_para_strike' => 3]);
        DB::table('tipo_faltas')->insert(['nome' => 'Reunião de Projeto', 'quantidade_para_strike' => 3]);
        DB::table('tipo_faltas')->insert(['nome' => 'Reunião de Planejamento', 'quantidade_para_strike' => 1]);
    }
}
