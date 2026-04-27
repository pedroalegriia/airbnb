import { Component, input } from '@angular/core';
@Component({
  selector: 'app-ui-button',
  template: `<button [type]="type()" [disabled]="disabled()" class="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 px-5 py-3.5 font-black text-white shadow-lg shadow-rose-500/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none md:w-auto"><ng-content /><span class="transition group-hover:translate-x-0.5">-></span></button>`
})
export class UiButtonComponent { type = input<'button' | 'submit'>('button'); disabled = input(false); }
