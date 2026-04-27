import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService, Booking } from '../../../core/services/api.service';
import { DateTimeService } from '../../../core/services/date-time.service';
@Component({ selector: 'app-my-bookings', imports: [TranslatePipe], template: `<section class="mx-auto max-w-4xl space-y-4 px-4"><h1 class="text-2xl font-black">{{ 'BOOKINGS.TITLE' | translate }}</h1>@for (booking of bookings; track booking.id) { <article class="rounded-3xl bg-white p-4 shadow-sm"><h2 class="font-bold">{{ booking.property.title }}</h2><p>{{ booking.start_date }} → {{ booking.end_date }}</p><p class="text-sm text-slate-500">{{ booking.status }} @if (booking.expires_at) { · {{ 'BOOKINGS.EXPIRES' | translate }} {{ dates.toLocal(booking.expires_at) }} }</p></article> } @empty { <p>{{ 'BOOKINGS.EMPTY' | translate }}</p> }</section>` })
export class MyBookingsComponent implements OnInit { bookings: Booking[] = []; constructor(private api: ApiService, public dates: DateTimeService) {} ngOnInit(): void { this.api.getBookings().subscribe(r => this.bookings = r.data); } }
