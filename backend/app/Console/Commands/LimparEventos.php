<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class LimparEventos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clear:eventos';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Exclui os eventos um mês mais velhos que a data atual';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        DB::table('eventos')->whereDate('data_evento', '<=', today()->subYear())->delete();
    }
}
