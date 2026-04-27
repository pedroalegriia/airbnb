import { Component, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { UiButtonComponent } from '../ui-button/ui-button.component';
@Component({ selector: 'app-booking-form', imports: [ReactiveFormsModule, TranslatePipe, DatePickerComponent, UiButtonComponent], template: `<form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4 rounded-3xl bg-white p-4 shadow-lg ring-1 ring-slate-100"><app-date-picker [startControl]="form.controls.start_date" [endControl]="form.controls.end_date" /><p class="text-sm text-slate-500">{{ 'PROPERTY.UNAVAILABLE' | translate }}: {{ unavailableDates().join(', ') || '-' }}</p><app-ui-button type="submit" [disabled]="form.invalid || hasUnavailableSelection()">{{ 'PROPERTY.BOOK' | translate }}</app-ui-button></form>` })
export class BookingFormComponent {
  unavailableDates = input<string[]>([]); submitted = output<{ start_date: string; end_date: string }>();
  form = new FormBuilder().nonNullable.group({ start_date: ['', Validators.required], end_date: ['', Validators.required] });
  submit(): void { if (this.form.valid && !this.hasUnavailableSelection()) this.submitted.emit(this.form.getRawValue()); }
  hasUnavailableSelection(): boolean { const { start_date, end_date } = this.form.getRawValue(); return this.unavailableDates().some(d => d >= start_date && d < end_date); }
}
