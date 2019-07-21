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
     * Today's date
     *
     * @var string
     */
    private $today = false;

    /**
     * array of overdue chains to insert
     *
     * @var array
     */
    private $insert = [];

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
            if ($this->outstandingOverdue($chain)) {
                $start_date = $this->determineStartDate($chain);
                $this->insert = [];

                print_r($chain);
                echo($start_date);

                while (strtotime($start_date) <= strtotime($this->today)) {
                    if ($this->shouldInsertDailyOverdue($chain, $start_date) ||
                        $this->shouldInsertWeeklyOverdue($chain, $start_date) ||
                        $this->shouldInsertMonthlyOverdue($chain, $start_date)) {
                        $this->insert[] = [
                            'chain_id' => $chain['id'],
                            'chain_completion_date' => $start_date,
                            'completed' => null,
                        ];
                    }
                    $start_date = $this->incrementStartDate($start_date);
                }
                $this->insertOverdue();
            }
        }
    }

    private function outstandingOverdue($chain)
    {
        return ($chain['last_outstanding'] == null &&
                $chain['last_completed'] == null) ||
                ($chain['last_outstanding'] < $this->today &&
                 $chain['last_completed'] < $this->today);
    }

    private function determineStartDate($chain)
    {
        if ($chain['last_completed'] == null &&
            $chain['last_outstanding'] == null) {
            return $chain['start_date'];
        } elseif ($chain['last_completed'] > $chain['last_outstanding']) {
            return $this->incrementStartDate($chain['last_completed']);
        }

        return $this->incrementStartDate($chain['last_outstanding']);
    }

    private function incrementStartDate($start_date)
    {
        return date("Y-m-d", strtotime("+1 day", strtotime($start_date)));
    }

    private function shouldInsertDailyOverdue($chain, $start_date)
    {
        return ($chain['frequency'] == 'daily' ||
                ($chain['frequency'] == 'weekday') &&
                 !in_array(
                     date('l', strtotime($start_date)),
                     ['Saturday', 'Sunday']
                 ));
    }

    private function shouldInsertWeeklyOverdue($chain, $start_date)
    {
        return ($chain['frequency'] == 'weekly' &&
            date('l', strtotime($start_date)) == 'Sunday');
    }

    private function shouldInsertMonthlyOverdue($chain, $start_date)
    {
        return ($chain['frequency'] == 'monthly' &&
                date('t', strtotime($start_date)) ==
                date('d', strtotime($start_date)));
    }

    private function insertOverdue()
    {
        if ($this->insert) {
            \DB::table('chain_completion')->insert($this->insert);
        }
    }
}
