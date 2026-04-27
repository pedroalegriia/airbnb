import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
@Component({ selector: 'app-profile', imports: [TranslatePipe], template: `<section class="mx-auto max-w-md rounded-3xl bg-white p-5 shadow-sm"><h1 class="text-2xl font-black">{{ 'NAV.PROFILE' | translate }}</h1><p class="mt-2 text-slate-500">{{ 'COMMON.SAVE' | translate }}</p></section>` })
export class ProfileComponent {}
