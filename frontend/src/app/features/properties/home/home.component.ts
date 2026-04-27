import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe, SearchBarComponent],
  template: `<section class="app-shell space-y-10">
  <div class="grid items-center gap-6 lg:grid-cols-[1.05fr_.95fr]">
    <div class="space-y-6">
      <div class="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-2 text-sm font-black text-rose-600 shadow-sm"><span class="h-2 w-2 rounded-full bg-rose-500"></span>{{ 'HOME.BADGE' | translate }}</div>
      <div class="space-y-4">
        <h1 class="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-7xl">{{ 'HOME.TITLE_A' | translate }} <span class="gradient-text">{{ 'HOME.TITLE_B' | translate }}</span></h1>
        <p class="max-w-2xl text-lg leading-8 text-slate-600">{{ 'HOME.SUBTITLE' | translate }}</p>
      </div>
      <app-search-bar (submitted)="search($event)" />
      <div class="grid grid-cols-3 gap-3 text-center">
        <div class="card p-4"><p class="text-2xl font-black">12k+</p><p class="text-xs font-bold text-slate-500">{{ 'HOME.STAYS' | translate }}</p></div>
        <div class="card p-4"><p class="text-2xl font-black">4.9</p><p class="text-xs font-bold text-slate-500">{{ 'HOME.RATING' | translate }}</p></div>
        <div class="card p-4"><p class="text-2xl font-black">24/7</p><p class="text-xs font-bold text-slate-500">{{ 'HOME.SUPPORT' | translate }}</p></div>
      </div>
    </div>
    <div class="relative min-h-[460px] overflow-hidden rounded-[2.5rem] bg-slate-950 p-4 shadow-2xl shadow-slate-950/20">
      <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1100&q=85" class="absolute inset-0 h-full w-full object-cover opacity-80" alt="" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"></div>
      <div class="relative flex h-full min-h-[430px] flex-col justify-end gap-4">
        <div class="glass-panel max-w-sm rounded-[2rem] p-5 text-white">
          <p class="text-sm font-bold text-white/70">{{ 'HOME.FEATURED' | translate }}</p>
          <h2 class="mt-2 text-2xl font-black">Casa del Mar</h2>
          <p class="mt-2 text-sm leading-6 text-white/80">Mallorca, Spain · 6 guests · Ocean view</p>
          <a routerLink="/properties" class="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950">{{ 'HOME.EXPLORE_NOW' | translate }}</a>
        </div>
      </div>
    </div>
  </div>
  <section class="grid gap-4 md:grid-cols-3">
    <article class="card p-5"><span class="pill">01</span><h3 class="mt-4 text-xl font-black">{{ 'HOME.VALUE_1_TITLE' | translate }}</h3><p class="mt-2 leading-7 text-slate-500">{{ 'HOME.VALUE_1_TEXT' | translate }}</p></article>
    <article class="card p-5"><span class="pill">02</span><h3 class="mt-4 text-xl font-black">{{ 'HOME.VALUE_2_TITLE' | translate }}</h3><p class="mt-2 leading-7 text-slate-500">{{ 'HOME.VALUE_2_TEXT' | translate }}</p></article>
    <article class="card p-5"><span class="pill">03</span><h3 class="mt-4 text-xl font-black">{{ 'HOME.VALUE_3_TITLE' | translate }}</h3><p class="mt-2 leading-7 text-slate-500">{{ 'HOME.VALUE_3_TEXT' | translate }}</p></article>
  </section>
</section>`
})
export class HomeComponent { constructor(private router: Router) {} search(filters: Record<string, string>) { this.router.navigate(['/properties'], { queryParams: filters }); } }
