import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Property } from '../../../core/services/api.service';
@Component({ selector: 'app-property-card', imports: [CurrencyPipe, RouterLink, TranslatePipe], template: `<article class="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100"><div class="aspect-[4/3] bg-gradient-to-br from-rose-100 to-slate-200"><img [src]="property().images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80'" class="h-full w-full object-cover" alt="" loading="lazy" /></div><div class="space-y-2 p-4"><div class="flex items-start justify-between gap-3"><h3 class="font-bold">{{ property().title }}</h3><span class="text-sm">★ {{ property().rating_avg || 'Nuevo' }}</span></div><p class="text-sm text-slate-500">{{ property().city }}, {{ property().country }}</p><p><b>{{ property().price_per_night | currency }}</b> / {{ 'PROPERTY.NIGHT' | translate }}</p><a [routerLink]="['/properties', property().id]" class="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">{{ 'PROPERTY.DETAIL' | translate }}</a></div></article>` })
export class PropertyCardComponent { property = input.required<Property>(); }
