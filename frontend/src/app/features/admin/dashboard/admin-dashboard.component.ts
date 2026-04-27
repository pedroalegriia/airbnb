import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AdminDashboard, ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CurrencyPipe, TranslatePipe],
  template: `<section class="app-shell space-y-6">
  <div class="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/15">
    <p class="text-sm font-black uppercase tracking-[0.25em] text-rose-300">{{ 'ADMIN.EYEBROW' | translate }}</p>
    <h1 class="mt-3 text-4xl font-black md:text-5xl">{{ 'ADMIN.TITLE' | translate }}</h1>
    <p class="mt-2 text-white/70">{{ 'ADMIN.SUBTITLE' | translate }}</p>
  </div>
  @if (dashboard) {
    <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      <div class="card p-5"><p class="text-sm font-bold text-slate-500">Users</p><p class="mt-2 text-3xl font-black">{{ dashboard.totals['users'] }}</p></div>
      <div class="card p-5"><p class="text-sm font-bold text-slate-500">Hosts</p><p class="mt-2 text-3xl font-black">{{ dashboard.totals['hosts'] }}</p></div>
      <div class="card p-5"><p class="text-sm font-bold text-slate-500">Guests</p><p class="mt-2 text-3xl font-black">{{ dashboard.totals['guests'] }}</p></div>
      <div class="card p-5"><p class="text-sm font-bold text-slate-500">Properties</p><p class="mt-2 text-3xl font-black">{{ dashboard.totals['properties'] }}</p></div>
      <div class="card p-5"><p class="text-sm font-bold text-slate-500">Bookings</p><p class="mt-2 text-3xl font-black">{{ dashboard.totals['bookings'] }}</p></div>
      <div class="card p-5"><p class="text-sm font-bold text-slate-500">Revenue</p><p class="mt-2 text-2xl font-black">{{ dashboard.totals['revenue'] | currency }}</p></div>
    </div>
    <div class="grid gap-6 lg:grid-cols-2">
      <article class="card p-5"><h2 class="text-xl font-black">{{ 'ADMIN.RECENT_BOOKINGS' | translate }}</h2><div class="mt-4 space-y-3">@for (booking of dashboard.recent.bookings; track booking.id) { <div class="rounded-2xl bg-slate-50 p-4"><b>#{{ booking.id }}</b> · {{ booking.status }} · {{ booking.total_amount | currency }}</div> }</div></article>
      <article class="card p-5"><h2 class="text-xl font-black">{{ 'ADMIN.RECENT_USERS' | translate }}</h2><div class="mt-4 space-y-3">@for (user of dashboard.recent.users; track user.id) { <div class="rounded-2xl bg-slate-50 p-4"><b>{{ user.name }}</b> · {{ user.role }} · {{ user.email }}</div> }</div></article>
    </div>
  } @else { <div class="card h-72 animate-pulse bg-slate-100"></div> }
</section>`
})
export class AdminDashboardComponent implements OnInit {
  dashboard?: AdminDashboard;
  constructor(private api: ApiService) {}
  ngOnInit(): void { this.api.getAdminDashboard().subscribe(r => this.dashboard = r.data); }
}
