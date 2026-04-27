import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { UiInputComponent } from '../../../shared/components/ui-input/ui-input.component';
@Component({ selector: 'app-login', imports: [ReactiveFormsModule, RouterLink, TranslatePipe, UiInputComponent, UiButtonComponent], template: `<form [formGroup]="form" (ngSubmit)="submit()" class="mx-auto max-w-md space-y-4 rounded-3xl bg-white p-5 shadow-sm"><h1 class="text-2xl font-black">{{ 'AUTH.LOGIN' | translate }}</h1><app-ui-input [control]="form.controls.email" [label]="'AUTH.EMAIL' | translate" /><app-ui-input [control]="form.controls.password" type="password" [label]="'AUTH.PASSWORD' | translate" /><p class="text-sm text-rose-600">{{ error }}</p><app-ui-button type="submit" [disabled]="form.invalid">{{ 'AUTH.LOGIN' | translate }}</app-ui-button><a routerLink="/register" class="block text-center text-sm text-rose-600">{{ 'AUTH.REGISTER' | translate }}</a></form>` })
export class LoginComponent { error = ''; form = new FormBuilder().nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] }); constructor(private auth: AuthService, private router: Router) {} submit(): void { this.auth.login(this.form.getRawValue()).subscribe({ next: () => this.router.navigateByUrl('/'), error: e => this.error = e.error?.message || 'Error' }); } }
