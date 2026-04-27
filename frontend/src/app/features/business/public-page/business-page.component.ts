import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService, Property } from '../../../core/services/api.service';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card.component';

@Component({
  selector: 'app-business-page',
  imports: [CurrencyPipe, RouterLink, TranslatePipe, PropertyCardComponent],
  template: `<section class="app-shell">
  @if (property) {
    <div class="relative overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-2xl shadow-slate-950/20">
      <img [src]="property.facade_image_url || property.images[0]" class="absolute inset-0 h-full w-full object-cover opacity-75" alt="" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
      <div class="relative flex min-h-[520px] flex-col justify-end p-5 text-white md:p-10">
        <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div class="max-w-3xl">
            <img [src]="property.logo_url || 'https://api.dicebear.com/8.x/initials/svg?seed=' + property.title" class="mb-5 h-20 w-20 rounded-3xl border-4 border-white bg-white object-cover shadow-xl" alt="" />
            <p class="text-sm font-black uppercase tracking-[0.25em] text-rose-200">{{ 'BUSINESS.PUBLIC_PAGE' | translate }}</p>
            <h1 class="mt-3 text-5xl font-black leading-none tracking-tight md:text-7xl">{{ property.business_name || property.title }}</h1>
            <p class="mt-4 max-w-2xl text-lg leading-8 text-white/80">{{ property.description }}</p>
          </div>
          <div class="glass-panel rounded-[2rem] p-5 text-white md:w-80">
            <p class="text-sm font-bold text-white/70">{{ property.city }}, {{ property.country }}</p>
            <p class="mt-2 text-3xl font-black">{{ property.price_per_night | currency }} <span class="text-sm font-semibold text-white/70">/ {{ 'PROPERTY.NIGHT' | translate }}</span></p>
            <div class="mt-4 grid grid-cols-2 gap-2 text-sm font-bold"><span class="rounded-2xl bg-white/15 p-3">★ {{ property.rating_avg || 'New' }}</span><span class="rounded-2xl bg-white/15 p-3">{{ property.max_guests }} {{ 'SEARCH.GUESTS' | translate }}</span></div>
            <button class="mt-4 w-full rounded-2xl bg-white px-4 py-3 font-black text-slate-950" (click)="share()">{{ 'BUSINESS.SHARE' | translate }}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <article class="space-y-6">
        <section class="card p-6 md:p-8">
          <p class="text-sm font-black uppercase tracking-wide text-rose-500">{{ 'BUSINESS.SERVICES' | translate }}</p>
          <h2 class="mt-2 text-3xl font-black">{{ 'BUSINESS.SERVICES_TITLE' | translate }}</h2>
          <div class="mt-6 grid gap-4 md:grid-cols-2">
            @for (group of property.services || []; track group.category_es || group.category_en) {
              <div class="rounded-[2rem] bg-slate-50 p-5 ring-1 ring-slate-100">
                <h3 class="text-xl font-black">{{ group.category_es || group.category_en }}</h3>
                <div class="mt-4 flex flex-wrap gap-2">
                  @for (item of group.items; track item) { <span class="pill">{{ item }}</span> }
                </div>
              </div>
            } @empty {
              <p class="rounded-3xl bg-slate-50 p-5 text-slate-500">{{ 'BUSINESS.NO_SERVICES' | translate }}</p>
            }
          </div>
        </section>

        <section class="grid gap-4 md:grid-cols-3">
          <div class="card p-5"><p class="text-sm font-bold text-slate-500">{{ 'DETAIL.CAPACITY' | translate }}</p><p class="mt-2 text-3xl font-black">{{ property.max_guests }}</p></div>
          <div class="card p-5"><p class="text-sm font-bold text-slate-500">{{ 'PROPERTY.CLEANING' | translate }}</p><p class="mt-2 text-3xl font-black">{{ property.cleaning_fee | currency }}</p></div>
          <div class="card p-5"><p class="text-sm font-bold text-slate-500">Status</p><p class="mt-2 text-3xl font-black">{{ property.status }}</p></div>
        </section>
      </article>

      <aside class="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div class="card p-5"><h3 class="text-xl font-black">{{ 'BUSINESS.BOOK_THIS' | translate }}</h3><p class="mt-2 text-sm leading-6 text-slate-500">{{ 'BUSINESS.BOOK_HINT' | translate }}</p><a [routerLink]="['/properties', property.id]" class="mt-4 inline-flex w-full justify-center rounded-2xl bg-slate-950 px-5 py-3 font-black text-white">{{ 'PROPERTY.BOOK' | translate }}</a></div>
        <app-property-card [property]="property" />
      </aside>
    </div>
  } @else {
    <div class="card h-[520px] animate-pulse bg-slate-100"></div>
  }
</section>`
})
export class BusinessPageComponent implements OnInit {
  property?: Property;
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.api.getPublicPage(slug).subscribe(r => this.property = r.data);
  }
  share(): void {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: this.property?.business_name || this.property?.title, url });
      return;
    }
    navigator.clipboard?.writeText(url);
  }
}
