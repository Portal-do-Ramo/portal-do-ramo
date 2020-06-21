<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MesesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('meses')->insert(['nome' => 'Janeiro']);
        DB::table('meses')->insert(['nome' => 'Fevereiro']);
        DB::table('meses')->insert(['nome' => 'Março']);
        DB::table('meses')->insert(['nome' => 'Abril']);
        DB::table('meses')->insert(['nome' => 'Maio']);
        DB::table('meses')->insert(['nome' => 'Junho']);
        DB::table('meses')->insert(['nome' => 'Julho']);
        DB::table('meses')->insert(['nome' => 'Agosto']);
        DB::table('meses')->insert(['nome' => 'Setembro']);
        DB::table('meses')->insert(['nome' => 'Outubro']);
        DB::table('meses')->insert(['nome' => 'Novembro']);
        DB::table('meses')->insert(['nome' => 'Dezembro']);
    }
}
