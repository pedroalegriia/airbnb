import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { I18nService } from '../../../core/services/i18n.service';
@Component({ selector: 'app-navbar', imports: [RouterLink, TranslatePipe], template: `
<header class="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur"><nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"><a routerLink="/" class="text-xl font-black text-rose-500">{{ 'APP.NAME' | translate }}</a><div class="flex items-center gap-2 text-sm"><a routerLink="/bookings" class="hidden md:inline">{{ 'NAV.BOOKINGS' | translate }}</a><a routerLink="/login" class="rounded-full px-3 py-2 hover:bg-slate-100">{{ 'NAV.LOGIN' | translate }}</a><select [value]="i18n.current()" (change)="i18n.use($any($event.target).value)" class="rounded-full border border-slate-200 px-2 py-2"><option value="es">ES</option><option value="en">EN</option></select></div></nav></header>
<nav class="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-slate-100 bg-white p-2 text-center text-xs md:hidden"><a routerLink="/" class="rounded-xl py-2">{{ 'NAV.HOME' | translate }}</a><a routerLink="/bookings" class="rounded-xl py-2">{{ 'NAV.BOOKINGS' | translate }}</a><a routerLink="/profile" class="rounded-xl py-2">{{ 'NAV.PROFILE' | translate }}</a></nav>` })
export class NavbarComponent { i18n = inject(I18nService); auth = inject(AuthService); }
