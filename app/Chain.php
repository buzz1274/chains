<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chain extends Model
{

    protected $table = 'chain';

    public static function chains($userID)
    {

        $query =
            self::select(array('chain.id', 'parent_id', 'chain',
                               'start_date', 'frequency', 'active',
                                \DB::raw('MAX(cc_last_completed.chain_completion_date) AS last_completed'),
                                \DB::raw('MAX(cc_last_outstanding.chain_completion_date) AS last_outstanding')))->
                    where('user_id', $userID)->
                    where('active', true)->
                    join(
                        'chain_frequency',
                        'chain_frequency.id',
                        '=',
                        'chain.frequency_id'
                    )->
                    leftjoin('chain_completion AS cc_last_completed', function ($join) {
                        $join->on('cc_last_completed.chain_id', '=', 'chain.id')->
                               whereNotNull('cc_last_completed.completed');
                    })->
                    leftjoin('chain_completion AS cc_last_outstanding', function ($join) {
                        $join->on('cc_last_outstanding.chain_id', '=', 'chain.id')->
                        whereNull('cc_last_outstanding.completed');
                    })->
                    groupBy(
                        'chain.id',
                        'parent_id',
                        'chain',
                        'start_date',
                        'frequency',
                        'active'
                    );

        return $query->get();
    }
}
