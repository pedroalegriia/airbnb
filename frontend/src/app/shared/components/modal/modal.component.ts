import { Component, input, output } from '@angular/core';
@Component({ selector: 'app-modal', template: `@if (open()) { <div class="fixed inset-0 z-50 grid place-items-end bg-slate-950/40 p-0 md:place-items-center md:p-6" (click)="closed.emit()"><section class="w-full rounded-t-3xl bg-white p-5 shadow-xl md:max-w-lg md:rounded-3xl" (click)="$event.stopPropagation()"><ng-content /></section></div> }` })
export class ModalComponent { open = input(false); closed = output<void>(); }
