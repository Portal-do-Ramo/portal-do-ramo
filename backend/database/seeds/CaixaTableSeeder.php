<?php

use App\Models\Caixa;
use Illuminate\Database\Seeder;

class CaixaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Caixa::create(['nome_caixa' => 'Caixa Emergencial', 'porcentagem_orcamento' => 5]);
        Caixa::create(['nome_caixa' => 'Caixa Administrativo', 'porcentagem_orcamento' => 10]);
    }
}
