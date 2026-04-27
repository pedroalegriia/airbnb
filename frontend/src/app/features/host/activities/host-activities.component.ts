import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Activity, ApiService } from '../../../core/services/api.service';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-host-activities',
  imports: [CurrencyPipe, ReactiveFormsModule, TranslatePipe, UiButtonComponent],
  template: `<section class="app-shell grid gap-6 lg:grid-cols-[420px_1fr]">
  <form [formGroup]="form" (ngSubmit)="create()" class="card space-y-4 p-5 lg:sticky lg:top-24 lg:self-start">
    <div><p class="text-sm font-black uppercase tracking-wide text-rose-500">{{ 'HOST.EYEBROW' | translate }}</p><h1 class="mt-2 text-3xl font-black">{{ 'HOST.TITLE' | translate }}</h1><p class="mt-2 text-sm leading-6 text-slate-500">{{ 'HOST.SUBTITLE' | translate }}</p></div>
    <input formControlName="property_id" type="number" class="field" placeholder="Property ID" />
    <input formControlName="title_es" class="field" placeholder="Titulo ES" />
    <input formControlName="title_en" class="field" placeholder="Title EN" />
    <input formControlName="category_es" class="field" placeholder="Categoria ES" />
    <input formControlName="category_en" class="field" placeholder="Category EN" />
    <input formControlName="price" type="number" class="field" placeholder="Price" />
    <input formControlName="duration_minutes" type="number" class="field" placeholder="Duration minutes" />
    <select formControlName="status" class="field"><option value="active">Active</option><option value="paused">Paused</option></select>
    <app-ui-button type="submit" [disabled]="form.invalid">{{ 'HOST.CREATE' | translate }}</app-ui-button>
  </form>
  <div class="space-y-4">
    @for (activity of activities; track activity.id) {
      <article class="card grid gap-4 p-4 md:grid-cols-[140px_1fr_auto]">
        <img [src]="activity.image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=85'" class="h-32 w-full rounded-3xl object-cover" alt="" />
        <div><span class="pill">{{ activity.category }}</span><h2 class="mt-3 text-2xl font-black">{{ activity.title }}</h2><p class="mt-2 text-slate-500">{{ activity.description }}</p></div>
        <div class="text-right"><p class="text-2xl font-black">{{ activity.price | currency }}</p><button class="mt-3 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white" (click)="remove(activity)">Delete</button></div>
      </article>
    } @empty { <div class="card p-8 text-center text-slate-500">{{ 'HOST.EMPTY' | translate }}</div> }
  </div>
</section>`
})
export class HostActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  form = new FormBuilder().nonNullable.group({ property_id: [0, [Validators.required, Validators.min(1)]], title_es: ['', Validators.required], title_en: ['', Validators.required], category_es: ['', Validators.required], category_en: ['', Validators.required], price: [0], duration_minutes: [60], status: ['active', Validators.required] });
  constructor(private api: ApiService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.api.getActivities().subscribe(r => this.activities = r.data); }
  create(): void { this.api.createActivity(this.form.getRawValue()).subscribe(() => { this.form.reset({ property_id: 0, title_es: '', title_en: '', category_es: '', category_en: '', price: 0, duration_minutes: 60, status: 'active' }); this.load(); }); }
  remove(activity: Activity): void { this.api.deleteActivity(activity.id).subscribe(() => this.load()); }
}
