import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Property } from '../../../core/services/api.service';
@Component({
  selector: 'app-property-card',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  template: `<article class="group card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10">
  <a [routerLink]="['/properties', property().id]" class="block">
    <div class="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-rose-100 via-orange-100 to-slate-200">
      <img [src]="property().images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80'" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" alt="" loading="lazy" />
      <div class="absolute inset-x-0 top-0 flex items-center justify-between p-3">
        <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-800 shadow-sm backdrop-blur">{{ property().status }}</span>
        <button type="button" class="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-rose-500 shadow-sm backdrop-blur">♡</button>
      </div>
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-4 pt-14 text-white">
        <p class="text-sm font-bold">{{ property().city }}, {{ property().country }}</p>
      </div>
    </div>
    <div class="space-y-3 p-4">
      <div class="flex items-start justify-between gap-3">
        <h3 class="line-clamp-2 text-lg font-black tracking-tight text-slate-950">{{ property().title }}</h3>
        <span class="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700">★ {{ property().rating_avg || 'New' }}</span>
      </div>
      <p class="line-clamp-2 text-sm leading-6 text-slate-500">{{ property().description }}</p>
      <div class="flex items-end justify-between border-t border-slate-100 pt-3">
        <p><span class="text-xl font-black">{{ property().price_per_night | currency }}</span><span class="text-sm text-slate-500"> / {{ 'PROPERTY.NIGHT' | translate }}</span></p>
        <span class="rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white">{{ 'PROPERTY.DETAIL' | translate }}</span>
      </div>
    </div>
  </a>
</article>`
})
export class PropertyCardComponent { property = input.required<Property>(); }
