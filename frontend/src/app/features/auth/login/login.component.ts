import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { UiInputComponent } from '../../../shared/components/ui-input/ui-input.component';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, UiInputComponent, UiButtonComponent],
  template: `<section class="app-shell grid min-h-[calc(100vh-9rem)] items-center gap-6 lg:grid-cols-[.9fr_1.1fr]">
  <div class="relative hidden min-h-[620px] overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20 lg:block"><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=85" class="absolute inset-0 h-full w-full object-cover opacity-70" alt="" /><div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div><div class="relative flex h-full flex-col justify-end"><span class="pill border-white/20 bg-white/15 text-white">{{ 'AUTH.SECURE' | translate }}</span><h1 class="mt-4 text-5xl font-black leading-tight">{{ 'AUTH.WELCOME' | translate }}</h1><p class="mt-4 max-w-md text-white/75">{{ 'AUTH.WELCOME_TEXT' | translate }}</p></div></div>
  <form [formGroup]="form" (ngSubmit)="submit()" class="card mx-auto w-full max-w-md space-y-5 p-6 md:p-8"><div><p class="text-sm font-black uppercase tracking-wide text-rose-500">{{ 'NAV.LOGIN' | translate }}</p><h1 class="mt-2 text-3xl font-black">{{ 'AUTH.LOGIN' | translate }}</h1><p class="mt-2 text-slate-500">{{ 'AUTH.LOGIN_TEXT' | translate }}</p></div><app-ui-input [control]="form.controls.email" [label]="'AUTH.EMAIL' | translate" /><app-ui-input [control]="form.controls.password" type="password" [label]="'AUTH.PASSWORD' | translate" />@if (error) { <p class="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{{ error }}</p> }<app-ui-button type="submit" [disabled]="form.invalid">{{ 'AUTH.LOGIN' | translate }}</app-ui-button><p class="text-center text-sm font-semibold text-slate-500">{{ 'AUTH.NO_ACCOUNT' | translate }} <a routerLink="/register" class="font-black text-rose-600">{{ 'AUTH.REGISTER' | translate }}</a></p></form>
</section>`
})
export class LoginComponent { error = ''; form = new FormBuilder().nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] }); constructor(private auth: AuthService, private router: Router) {} submit(): void { this.auth.login(this.form.getRawValue()).subscribe({ next: () => this.router.navigateByUrl('/'), error: e => this.error = e.error?.message || 'Error' }); } }
