<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chain extends Model
{
    protected $table = 'chain';

    public static function chains($userID = false)
    {
        $query =
            self::select(array('chain.id', 'parent_id', 'chain',
                               'start_date', 'frequency', 'active',
                               'current_streak', 'max_streak', 'display_name',
                                \DB::raw('MAX(cc_last_completed.chain_completion_date) AS last_completed'),
                                \DB::raw('current_streak * points_for_completion AS points'),
                                \DB::raw('MAX(cc_last_outstanding.chain_completion_date) AS last_outstanding')))->
                    where(function ($query) use ($userID) {
                        if ($userID) {
                            $query->where('user_id', '=', $userID);
                        }
                    })->
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
                        'active',
                        'display_name',
                        'ordering',
                        'points_for_completion'
                    )->
                    orderBy(
                        'ordering',
                        'asc'
                    );

        return $query->get();
    }

    public static function outstanding($userID)
    {
        $query =
            self::select(array(\DB::raw('chain_completion.id AS chain_completion_id'),
                               'chain.id', 'chain', 'frequency',
                               'chain_completion.chain_completion_date'))->
                    where('chain.user_id', $userID)->
                    whereNull('chain_completion.completed')->
                    join(
                        'chain_completion',
                        'chain_completion.chain_id',
                        '=',
                        'chain.id'
                    )->
                    join(
                        'chain_frequency',
                        'chain_frequency.id',
                        '=',
                        'chain.frequency_id'
                    )->
                    orderBy('chain.id', 'chain_completion.chain_completion_date');

        return $query->get();
    }

    /**
     * @param int $userID
     * @return int
     */
    public static function points(int $userID): int
    {
        $points = 0;

        foreach(self::chains($userID) as $chain) {
            $points += $chain->points;
        }

        return $points;
    }
}
