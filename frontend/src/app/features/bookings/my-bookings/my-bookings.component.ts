import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService, Booking } from '../../../core/services/api.service';
import { DateTimeService } from '../../../core/services/date-time.service';
@Component({
  selector: 'app-my-bookings',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  template: `<section class="app-shell space-y-6">
  <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p class="text-sm font-black uppercase tracking-wide text-rose-500">{{ 'BOOKINGS.EYEBROW' | translate }}</p><h1 class="text-4xl font-black">{{ 'BOOKINGS.TITLE' | translate }}</h1><p class="mt-2 text-slate-500">{{ 'BOOKINGS.SUBTITLE' | translate }}</p></div><a routerLink="/properties" class="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/15">{{ 'LIST.TITLE' | translate }}</a></div>
  <div class="grid gap-4">@for (booking of bookings; track booking.id) { <article class="card grid gap-4 overflow-hidden p-4 md:grid-cols-[220px_1fr_auto]"><img [src]="booking.property.images[0] || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=80'" class="h-44 w-full rounded-[1.5rem] object-cover md:h-full" alt="" /><div class="space-y-2"><span class="pill">{{ booking.status }}</span><h2 class="text-2xl font-black">{{ booking.property.title }}</h2><p class="font-semibold text-slate-500">{{ booking.start_date }} -> {{ booking.end_date }}</p>@if (booking.expires_at) { <p class="text-sm font-bold text-rose-600">{{ 'BOOKINGS.EXPIRES' | translate }} {{ dates.toLocal(booking.expires_at) }}</p> }</div><div class="flex items-end justify-between md:block md:text-right"><p class="text-sm font-bold text-slate-500">Total</p><p class="text-2xl font-black">{{ booking.total_amount | currency }}</p></div></article> } @empty { <div class="card grid place-items-center px-6 py-16 text-center"><div class="max-w-md"><p class="text-5xl font-black text-rose-500">B</p><h2 class="mt-3 text-2xl font-black">{{ 'BOOKINGS.EMPTY' | translate }}</h2><p class="mt-2 leading-7 text-slate-500">{{ 'BOOKINGS.EMPTY_TEXT' | translate }}</p></div></div> }</div>
</section>`
})
export class MyBookingsComponent implements OnInit { bookings: Booking[] = []; constructor(private api: ApiService, public dates: DateTimeService) {} ngOnInit(): void { this.api.getBookings().subscribe(r => this.bookings = r.data); } }
