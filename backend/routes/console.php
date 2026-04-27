<?php

use App\Jobs\ExpirePendingBookings;
use Illuminate\Support\Facades\Schedule;

Schedule::job(new ExpirePendingBookings)->everyMinute()->withoutOverlapping();
