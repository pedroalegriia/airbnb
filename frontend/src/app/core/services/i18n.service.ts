import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly supported = ['es', 'en'] as const;
  constructor(private translate: TranslateService) {
    const saved = localStorage.getItem('lang') || 'es';
    this.translate.addLangs([...this.supported]);
    this.use(this.supported.includes(saved as 'es' | 'en') ? saved : 'es');
  }
  use(lang: string): void { localStorage.setItem('lang', lang); this.translate.use(lang); }
  current(): string { return this.translate.currentLang || 'es'; }
}
