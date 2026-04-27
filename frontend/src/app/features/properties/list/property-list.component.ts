import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService, Property } from '../../../core/services/api.service';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
@Component({
  selector: 'app-property-list',
  imports: [TranslatePipe, SearchBarComponent, PropertyCardComponent],
  template: `<section class="app-shell space-y-6">
  <div class="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/15 md:p-8">
    <p class="text-sm font-black uppercase tracking-[0.25em] text-rose-300">{{ 'LIST.EYEBROW' | translate }}</p>
    <div class="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><h1 class="text-3xl font-black md:text-5xl">{{ 'LIST.TITLE' | translate }}</h1><p class="mt-2 max-w-2xl text-white/70">{{ 'LIST.SUBTITLE' | translate }}</p></div><span class="pill border-white/20 bg-white/10 text-white">{{ properties.length }} {{ 'LIST.RESULTS' | translate }}</span></div>
  </div>
  <app-search-bar (submitted)="load($event)" />
  @if (loading) {
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">@for (item of [1,2,3,4,5,6]; track item) { <div class="card h-80 animate-pulse bg-slate-100"></div> }</div>
  } @else if (properties.length) {
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">@for (property of properties; track property.id) { <app-property-card [property]="property" /> }</div>
  } @else {
    <div class="card grid place-items-center px-6 py-16 text-center"><div class="max-w-md"><p class="text-5xl font-black text-rose-500">0</p><h2 class="mt-3 text-2xl font-black">{{ 'LIST.EMPTY_TITLE' | translate }}</h2><p class="mt-2 leading-7 text-slate-500">{{ 'LIST.EMPTY_TEXT' | translate }}</p></div></div>
  }
</section>`
})
export class PropertyListComponent implements OnInit { properties: Property[] = []; loading = true; constructor(private api: ApiService, private route: ActivatedRoute) {} ngOnInit(): void { this.route.queryParams.subscribe(params => this.load(params)); } load(filters: Record<string, string | number | undefined>): void { this.loading = true; this.api.getProperties(filters).subscribe({ next: r => { this.properties = r.data; this.loading = false; }, error: () => this.loading = false }); } }
