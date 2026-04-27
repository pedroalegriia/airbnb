import { Component, input } from '@angular/core';
@Component({ selector: 'app-ui-button', template: `<button [type]="type()" [disabled]="disabled()" class="w-full rounded-2xl bg-rose-500 px-5 py-3 font-semibold text-white shadow-sm transition active:scale-[.99] disabled:cursor-not-allowed disabled:bg-slate-300 md:w-auto"><ng-content /></button>` })
export class UiButtonComponent { type = input<'button' | 'submit'>('button'); disabled = input(false); }
