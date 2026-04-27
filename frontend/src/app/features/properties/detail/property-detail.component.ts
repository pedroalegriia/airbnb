import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService, Booking, Property } from '../../../core/services/api.service';
import { BookingFormComponent } from '../../../shared/components/booking-form/booking-form.component';
@Component({
  selector: 'app-property-detail',
  imports: [CurrencyPipe, RouterLink, TranslatePipe, BookingFormComponent],
  template: `<section class="app-shell">
  @if (property) {
    <div class="space-y-6">
      <div class="grid gap-3 md:grid-cols-[1.4fr_.6fr]">
        <div class="relative min-h-80 overflow-hidden rounded-[2.5rem] bg-slate-200 shadow-2xl shadow-slate-950/10 md:min-h-[520px]"><img [src]="property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=85'" class="absolute inset-0 h-full w-full object-cover" alt="" /><div class="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent"></div><div class="absolute bottom-5 left-5 right-5 text-white"><span class="pill border-white/20 bg-white/20 text-white">{{ property.status }}</span><h1 class="mt-3 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">{{ property.title }}</h1></div></div>
        <div class="grid grid-cols-2 gap-3 md:grid-cols-1"><img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=700&q=80" class="h-full min-h-40 rounded-[2rem] object-cover shadow-lg" alt="" /><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80" class="h-full min-h-40 rounded-[2rem] object-cover shadow-lg" alt="" /></div>
      </div>
      <div class="grid gap-6 lg:grid-cols-[1fr_390px]">
        <article class="space-y-6">
          <div class="card p-5 md:p-7"><div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div><p class="text-sm font-black uppercase tracking-wide text-rose-500">{{ property.city }}, {{ property.country }}</p><h2 class="mt-2 text-2xl font-black">{{ 'DETAIL.ABOUT' | translate }}</h2></div><div class="flex gap-2"><span class="pill">★ {{ property.rating_avg || 'New' }}</span><span class="pill">{{ property.max_guests }} {{ 'SEARCH.GUESTS' | translate }}</span></div></div><p class="mt-5 text-lg leading-8 text-slate-600">{{ property.description }}</p></div>
          <div class="grid gap-4 sm:grid-cols-3"><div class="card p-5"><p class="text-sm font-bold text-slate-500">{{ 'DETAIL.PRICE' | translate }}</p><p class="mt-2 text-2xl font-black">{{ property.price_per_night | currency }}</p></div><div class="card p-5"><p class="text-sm font-bold text-slate-500">{{ 'PROPERTY.CLEANING' | translate }}</p><p class="mt-2 text-2xl font-black">{{ property.cleaning_fee | currency }}</p></div><div class="card p-5"><p class="text-sm font-bold text-slate-500">{{ 'DETAIL.CAPACITY' | translate }}</p><p class="mt-2 text-2xl font-black">{{ property.max_guests }}</p></div></div>
          <div class="card p-5"><h3 class="text-xl font-black">{{ 'DETAIL.HIGHLIGHTS' | translate }}</h3><div class="mt-4 flex flex-wrap gap-2"><span class="pill">Wifi</span><span class="pill">Self check-in</span><span class="pill">Kitchen</span><span class="pill">Workspace</span><span class="pill">Verified host</span></div></div>
        </article>
        <aside class="lg:sticky lg:top-24 lg:self-start"><app-booking-form [pricePerNight]="property.price_per_night" [cleaningFee]="property.cleaning_fee" (submitted)="book($event)" />@if (booking) { <div class="mt-4 rounded-[2rem] border border-emerald-100 bg-emerald-50 p-5 text-emerald-950 shadow-lg shadow-emerald-900/5"><p class="text-sm font-black uppercase tracking-wide text-emerald-700">{{ booking.status }}</p><h3 class="mt-1 text-xl font-black">{{ 'DETAIL.BOOKING_CREATED' | translate }}</h3><p class="mt-2 text-sm leading-6 text-emerald-800">{{ 'DETAIL.PAYMENT_HINT' | translate }}</p><button class="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-3 font-black text-white shadow-lg shadow-emerald-600/20" (click)="pay()">{{ 'PROPERTY.PAY' | translate }}</button></div> }</aside>
      </div>
    </div>
  } @else if (error) {
    <div class="card mx-auto max-w-2xl p-8 text-center">
      <p class="text-sm font-black uppercase tracking-wide text-rose-500">Error</p>
      <h1 class="mt-3 text-3xl font-black">{{ 'DETAIL.NOT_FOUND' | translate }}</h1>
      <p class="mt-3 leading-7 text-slate-500">{{ error }}</p>
      <a routerLink="/properties" class="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 font-black text-white">{{ 'LIST.TITLE' | translate }}</a>
    </div>
  } @else {
    <div class="card h-96 animate-pulse bg-slate-100"></div>
  }
</section>`
})
export class PropertyDetailComponent implements OnInit {
  property?: Property;
  booking?: Booking;
  error = '';
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.property = undefined;
      this.booking = undefined;
      this.error = '';
      if (!id) {
        this.error = 'Missing property id.';
        return;
      }
      this.api.getProperty(id).subscribe({
        next: r => this.property = r.data,
        error: e => this.error = e.error?.message || 'No se pudo cargar el alojamiento. Verifica que exista y que hayas ejecutado las migraciones/seeders.'
      });
    });
  }
  book(dates: { start_date: string; end_date: string }): void { if (!this.property) return; this.api.createBooking({ property_id: this.property.id, ...dates }).subscribe(r => this.booking = r.data); }
  pay(): void { const paymentId = this.booking?.payment?.id; if (paymentId) this.api.createPaymentIntent(paymentId).subscribe(); }
}
