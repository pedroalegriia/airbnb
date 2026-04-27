import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({ selector: 'app-ui-input', imports: [ReactiveFormsModule], template: `<label class="block text-sm font-medium text-slate-700">{{ label() }}<input [type]="type()" [formControl]="control()" class="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-200 focus:ring-4" /></label>` })
export class UiInputComponent { label = input.required<string>(); control = input.required<FormControl<string>>(); type = input('text'); }
