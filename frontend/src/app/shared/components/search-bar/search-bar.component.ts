import { Component, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { UiButtonComponent } from '../ui-button/ui-button.component';
@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, TranslatePipe, UiButtonComponent],
  template: `<form [formGroup]="form" (ngSubmit)="submitted.emit(form.value)" class="glass-panel grid gap-3 rounded-[2rem] p-3 md:grid-cols-[1.4fr_1fr_1fr_.8fr_auto] md:p-4">
  <label class="rounded-3xl bg-white p-3 ring-1 ring-slate-100"><span class="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">{{ 'SEARCH.CITY' | translate }}</span><input formControlName="city" [placeholder]="'SEARCH.CITY_PLACEHOLDER' | translate" class="w-full bg-transparent text-base font-bold outline-none placeholder:text-slate-300" /></label>
  <label class="rounded-3xl bg-white p-3 ring-1 ring-slate-100"><span class="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">{{ 'SEARCH.START' | translate }}</span><input formControlName="start_date" type="date" class="w-full bg-transparent text-sm font-bold outline-none" /></label>
  <label class="rounded-3xl bg-white p-3 ring-1 ring-slate-100"><span class="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">{{ 'SEARCH.END' | translate }}</span><input formControlName="end_date" type="date" class="w-full bg-transparent text-sm font-bold outline-none" /></label>
  <label class="rounded-3xl bg-white p-3 ring-1 ring-slate-100"><span class="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">{{ 'SEARCH.GUESTS' | translate }}</span><input formControlName="guests" type="number" min="1" placeholder="2" class="w-full bg-transparent text-base font-bold outline-none placeholder:text-slate-300" /></label>
  <div class="flex items-stretch"><app-ui-button type="submit">{{ 'SEARCH.CTA' | translate }}</app-ui-button></div>
</form>`
})
export class SearchBarComponent { submitted = output<Record<string, string>>(); form = new FormBuilder().nonNullable.group({ city: '', start_date: '', end_date: '', guests: '' }); }
