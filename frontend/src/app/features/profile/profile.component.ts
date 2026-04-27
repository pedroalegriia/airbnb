import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-profile',
  imports: [TranslatePipe],
  template: `<section class="app-shell grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
  <aside class="card p-6"><div class="grid h-24 w-24 place-items-center rounded-[2rem] bg-gradient-to-br from-rose-500 to-orange-400 text-4xl font-black text-white shadow-lg shadow-rose-500/25">U</div><h1 class="mt-5 text-3xl font-black">{{ 'PROFILE.TITLE' | translate }}</h1><p class="mt-2 leading-7 text-slate-500">{{ 'PROFILE.SUBTITLE' | translate }}</p><div class="mt-6 flex flex-wrap gap-2"><span class="pill">Verified</span><span class="pill">Guest</span><span class="pill">ES/EN</span></div></aside>
  <div class="space-y-4"><article class="card p-6"><h2 class="text-xl font-black">{{ 'PROFILE.ACCOUNT' | translate }}</h2><div class="mt-5 grid gap-4 md:grid-cols-2"><div class="rounded-3xl bg-slate-50 p-4"><p class="text-sm font-bold text-slate-500">Email</p><p class="mt-1 font-black">user@example.com</p></div><div class="rounded-3xl bg-slate-50 p-4"><p class="text-sm font-bold text-slate-500">Status</p><p class="mt-1 font-black text-emerald-600">Active</p></div></div></article><article class="card p-6"><h2 class="text-xl font-black">{{ 'PROFILE.PREFERENCES' | translate }}</h2><p class="mt-2 text-slate-500">{{ 'PROFILE.PREFERENCES_TEXT' | translate }}</p></article></div>
</section>`
})
export class ProfileComponent {}
