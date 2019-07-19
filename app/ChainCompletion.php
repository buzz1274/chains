<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Chain;

class ChainCompletion extends Model
{
    protected $table = 'chain_completion';

    public static function chainBelongsToUserAndIsOutstanding(
        $userID,
        $completionID
    ) {
        return (bool)self::select(array('chain_completion.id'))->
            where('chain_completion.id', '=', $completionID)->
            where('user_id', '=', $userID)->
            whereNull('chain_completion.completed')->
            join(
                'chain',
                'chain.id',
                '=',
                'chain_completion.chain_id'
            )->count();
    }

    public static function doOlderOutstandingChainsExist($completionID)
    {
        return (bool)self::select(array('chain_completion.id'))->
            where('chain_completion.id', '=', $completionID)->
            whereNull('chain_completion.completed')->
            join('chain_completion AS cc_older', function ($join) {
                $join->on(
                    'cc_older.chain_id',
                    '=',
                    'chain_completion.chain_id'
                )->on(
                    'cc_older.chain_completion_date',
                    '<',
                    'chain_completion.chain_completion_date'
                )->
                    whereNull('cc_older.completed');
            })->count();
    }

    public static function completeChain($id, $action)
    {
        $completedChain = self::find($id);
        $chain = Chain::find($completedChain->chain_id);

        if ($action == 'yes') {
            $completedChain->completed = true;
            $chain->current_streak++;

            if ($chain->current_streak > $chain->max_streak) {
                $chain->max_streak = $chain->current_streak;
            }
        } elseif ($action == 'no') {
            $completedChain->completed = false;
            $chain->current_streak = 0;
        }

        $completedChain->save();
        $chain->save();
    }
}
