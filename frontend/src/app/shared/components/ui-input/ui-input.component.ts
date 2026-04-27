import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-ui-input',
  imports: [ReactiveFormsModule],
  template: `<label class="block text-sm font-bold text-slate-700"><span class="mb-2 block">{{ label() }}</span><input [type]="type()" [formControl]="control()" class="field" /></label>`
})
export class UiInputComponent { label = input.required<string>(); control = input.required<FormControl<string>>(); type = input('text'); }
