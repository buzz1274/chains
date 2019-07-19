<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DBDump extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:dump';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Dump database';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $dump_file = '/mnt/backups/chain.zz50.co.uk_'.date('Y-m-d').'.sql';

        exec('export PGPASSWORD="'.DB::Connection()->getConfig('password').'"; '.
            'pg_dump -U'.DB::Connection()->getConfig('username').' '.
            '-h'.DB::Connection()->getConfig('host').' '.DB::Connection()->getDatabaseName().' '.
            '--inserts --clean > '.$dump_file);
    }
}
