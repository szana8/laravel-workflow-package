<?php

namespace App;

use szana8\Laraflow\Events\LaraflowTransitionEvents;
use szana8\Laraflow\LaraflowCallbackInterface;

class TestPreCallback implements LaraflowCallbackInterface
{
    public function handle(LaraflowTransitionEvents $event)
    {
        CallbackTest::insert(['message' => json_encode($event->convertToArray())]);
    }
}
