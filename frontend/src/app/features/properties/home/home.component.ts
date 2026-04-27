import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
@Component({ selector: 'app-home', imports: [TranslatePipe, SearchBarComponent], template: `<section class="mx-auto max-w-6xl px-4"><div class="rounded-[2rem] bg-gradient-to-br from-rose-500 to-orange-400 p-6 text-white md:p-12"><p class="text-sm font-semibold uppercase tracking-wider">MVP</p><h1 class="mt-3 max-w-2xl text-4xl font-black md:text-6xl">{{ 'APP.TAGLINE' | translate }}</h1></div><div class="-mt-8 px-2"><app-search-bar (submitted)="search($event)" /></div></section>` })
export class HomeComponent { constructor(private router: Router) {} search(filters: Record<string, string>) { this.router.navigate(['/properties'], { queryParams: filters }); } }
