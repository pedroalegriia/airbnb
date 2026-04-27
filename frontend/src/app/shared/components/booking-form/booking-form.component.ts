import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { UiButtonComponent } from '../ui-button/ui-button.component';
@Component({
  selector: 'app-booking-form',
  imports: [CurrencyPipe, ReactiveFormsModule, TranslatePipe, DatePickerComponent, UiButtonComponent],
  template: `<form [formGroup]="form" (ngSubmit)="submit()" class="card space-y-5 p-5">
  <div class="flex items-end justify-between gap-4">
    <div><p class="text-sm font-bold text-slate-500">{{ 'PROPERTY.STARTING_AT' | translate }}</p><p class="text-2xl font-black">{{ pricePerNight() | currency }} <span class="text-sm font-semibold text-slate-500">/ {{ 'PROPERTY.NIGHT' | translate }}</span></p></div>
    <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{{ 'PROPERTY.INSTANT' | translate }}</span>
  </div>
  <app-date-picker [startControl]="form.controls.start_date" [endControl]="form.controls.end_date" />
  <div class="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
    <div class="flex justify-between"><span>{{ 'PROPERTY.CLEANING' | translate }}</span><b>{{ cleaningFee() | currency }}</b></div>
    <div class="mt-2 flex justify-between"><span>{{ 'PROPERTY.SERVICE' | translate }}</span><b>{{ serviceFee() | currency }}</b></div>
  </div>
  <p class="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{{ 'PROPERTY.UNAVAILABLE' | translate }}: {{ unavailableDates().join(', ') || '-' }}</p>
  <app-ui-button type="submit" [disabled]="form.invalid || hasUnavailableSelection()">{{ 'PROPERTY.BOOK' | translate }}</app-ui-button>
  <p class="text-center text-xs font-semibold text-slate-400">{{ 'PROPERTY.NO_CHARGE' | translate }}</p>
</form>`
})
export class BookingFormComponent {
  unavailableDates = input<string[]>([]);
  pricePerNight = input<string | number>('0');
  cleaningFee = input<string | number>('0');
  submitted = output<{ start_date: string; end_date: string }>();
  form = new FormBuilder().nonNullable.group({ start_date: ['', Validators.required], end_date: ['', Validators.required] });
  serviceFee(): number { return Math.max(Number(this.pricePerNight()) * 0.08, 0); }
  submit(): void { if (this.form.valid && !this.hasUnavailableSelection()) this.submitted.emit(this.form.getRawValue()); }
  hasUnavailableSelection(): boolean { const { start_date, end_date } = this.form.getRawValue(); return this.unavailableDates().some(d => d >= start_date && d < end_date); }
}
