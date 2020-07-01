<?php

use App\Models\Arquivo;
use Illuminate\Database\Seeder;

class ArquivoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Arquivo::create(['nome' => 'Estatuto Ramo Estudantil IEEE CEFET-RJ - Atualizado 05_2020', 'path' => '1BzrzMTfzUb8iq3gLIOBvJnJMVHYp0U5a\/12sDCOrLW5IVbe9gTVYqRnKSMlZu1bWIo']);
    }
}
