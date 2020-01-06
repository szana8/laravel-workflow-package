<?php

namespace App\Listeners;

use szana8\Laraflow\Events\LaraflowEvents;

class LaraflowEventSubscriber
{
    /**
     * Register the listeners for the subscriber.
     *
     * @param  \Illuminate\Events\Dispatcher  $events
     */
    public function subscribe($events)
    {
        $events->listen(
            LaraflowEvents::PRE_TRANSITION,
            'App\TestPreCallback@handle'
        );
    }
}
