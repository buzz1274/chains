<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Chain;

class ChainsOutstanding extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chains:outstanding';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Todays date
     *
     * @var string
     */
    private $today = false;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->today = date('Y-m-d');
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        foreach (Chain::chains()->toArray() as $chain) {
            switch ($chain['frequency']) {
                case 'daily':
                    $this->daily($chain);
                    break;
            }
        }
    }

    private function daily($chain)
    {
        if (($chain['last_outstanding'] == null && $chain['last_completed'] == null) ||
            ($chain['last_outstanding'] < $this->today && $chain['last_completed'] < $this->today)) {

            if ($chain['last_completed'] == null && $chain['last_outstanding'] == null) {
                $start_date = $chain['start_date'];
            } elseif ($chain['last_completed'] > $chain['last_outstanding']) {
                $start_date = $chain['last_completed'];
            } else {
                $start_date = $chain['last_outstanding'];
            }

            while (strtotime($start_date) <= strtotime($this->today)) {
                $start_date = date("Y-m-d", strtotime("+1 day", strtotime($start_date)));

                $insert[] = [
                    'chain_id' => $chain['id'],
                    'chain_completion_date' => $start_date,
                    'completed' => null,
                ];
            }

            if (isset($insert)) {
                \DB::table('chain_completion')->insert($insert);
            }

        }

    }

}
