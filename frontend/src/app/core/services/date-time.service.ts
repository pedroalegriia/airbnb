import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class DateTimeService {
  toLocal(utcIso?: string): string { return utcIso ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(utcIso)) : ''; }
  todayIso(): string { return new Date().toISOString().slice(0, 10); }
}
