import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-date-picker',
  imports: [ReactiveFormsModule],
  template: `<div class="grid grid-cols-2 gap-3"><label class="text-xs font-black uppercase tracking-wide text-slate-500">Check-in<input type="date" [formControl]="startControl()" [min]="min()" class="field mt-2" /></label><label class="text-xs font-black uppercase tracking-wide text-slate-500">Check-out<input type="date" [formControl]="endControl()" [min]="min()" class="field mt-2" /></label></div>`
})
export class DatePickerComponent { startControl = input.required<FormControl<string>>(); endControl = input.required<FormControl<string>>(); min = input(new Date().toISOString().slice(0, 10)); }
