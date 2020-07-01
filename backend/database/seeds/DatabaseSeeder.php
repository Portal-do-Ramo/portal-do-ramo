<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CursosTableSeeder::class);
        $this->call(HierarquiasTableSeeder::class);
        $this->call(TipoFaltasTableSeeder::class);
        $this->call(TipoPedidoTableSeeder::class);
        $this->call(SituacaoTableSeeder::class);
        $this->call(CaixaTableSeeder::class);
        $this->call(MesesTableSeeder::class);
        $this->call(ArquivoTableSeeder::class);
    }
}
