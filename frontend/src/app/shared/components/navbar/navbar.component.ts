import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { I18nService } from '../../../core/services/i18n.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  template: `
<header class="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-2xl">
  <nav class="app-shell flex items-center justify-between py-3">
    <a routerLink="/" class="flex items-center gap-2">
      <span class="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 font-black text-white shadow-lg shadow-rose-500/25">S</span>
      <span class="leading-tight"><span class="block text-lg font-black tracking-tight">{{ 'APP.NAME' | translate }}</span><span class="hidden text-xs font-semibold text-slate-500 sm:block">{{ 'APP.TAGLINE' | translate }}</span></span>
    </a>
    <div class="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/75 p-1 text-sm font-bold shadow-sm md:flex">
      <a routerLink="/" routerLinkActive="bg-slate-950 text-white" [routerLinkActiveOptions]="{ exact: true }" class="rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100">{{ 'NAV.HOME' | translate }}</a>
      <a routerLink="/properties" routerLinkActive="bg-slate-950 text-white" class="rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100">{{ 'NAV.EXPLORE' | translate }}</a>
      <a routerLink="/bookings" routerLinkActive="bg-slate-950 text-white" class="rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100">{{ 'NAV.BOOKINGS' | translate }}</a>
    </div>
    <div class="flex items-center gap-2">
      <select [value]="i18n.current()" (change)="i18n.use($any($event.target).value)" class="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-black shadow-sm outline-none">
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
      @if (auth.user(); as user) {
        <span class="hidden rounded-full bg-rose-50 px-4 py-2 text-sm font-black text-rose-600 sm:inline-flex">{{ user.name }}</span>
        <button type="button" class="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5" (click)="auth.logout()">{{ 'NAV.LOGOUT' | translate }}</button>
      } @else {
        <a routerLink="/login" class="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5">{{ 'NAV.LOGIN' | translate }}</a>
      }
    </div>
  </nav>
</header>
<nav class="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/70 bg-white/90 px-3 py-2 text-center text-[11px] font-black text-slate-500 shadow-[0_-18px_45px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:hidden">
  <div class="mx-auto grid max-w-md grid-cols-4 gap-1">
    <a routerLink="/" routerLinkActive="bg-rose-50 text-rose-600" [routerLinkActiveOptions]="{ exact: true }" class="rounded-2xl py-2"><span class="block text-lg">H</span>{{ 'NAV.HOME' | translate }}</a>
    <a routerLink="/properties" routerLinkActive="bg-rose-50 text-rose-600" class="rounded-2xl py-2"><span class="block text-lg">E</span>{{ 'NAV.EXPLORE' | translate }}</a>
    <a routerLink="/bookings" routerLinkActive="bg-rose-50 text-rose-600" class="rounded-2xl py-2"><span class="block text-lg">B</span>{{ 'NAV.BOOKINGS' | translate }}</a>
    <a routerLink="/profile" routerLinkActive="bg-rose-50 text-rose-600" class="rounded-2xl py-2"><span class="block text-lg">P</span>{{ 'NAV.PROFILE' | translate }}</a>
  </div>
</nav>`
})
export class NavbarComponent { i18n = inject(I18nService); auth = inject(AuthService); }
