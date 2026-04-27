import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({ selector: 'app-date-picker', imports: [ReactiveFormsModule], template: `<div class="grid grid-cols-2 gap-3"><input type="date" [formControl]="startControl()" [min]="min()" class="rounded-2xl border px-4 py-3" /><input type="date" [formControl]="endControl()" [min]="min()" class="rounded-2xl border px-4 py-3" /></div>` })
export class DatePickerComponent { startControl = input.required<FormControl<string>>(); endControl = input.required<FormControl<string>>(); min = input(new Date().toISOString().slice(0, 10)); }
