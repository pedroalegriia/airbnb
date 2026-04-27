import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService, Property } from '../../../core/services/api.service';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
@Component({ selector: 'app-property-list', imports: [TranslatePipe, SearchBarComponent, PropertyCardComponent], template: `<section class="mx-auto max-w-6xl space-y-5 px-4"><app-search-bar (submitted)="load($event)" />@if (loading) { <p>{{ 'COMMON.LOADING' | translate }}</p> } @else { <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">@for (property of properties; track property.id) { <app-property-card [property]="property" /> }</div> }</section>` })
export class PropertyListComponent implements OnInit { properties: Property[] = []; loading = true; constructor(private api: ApiService, private route: ActivatedRoute) {} ngOnInit(): void { this.route.queryParams.subscribe(params => this.load(params)); } load(filters: Record<string, string | number | undefined>): void { this.loading = true; this.api.getProperties(filters).subscribe({ next: r => { this.properties = r.data; this.loading = false; }, error: () => this.loading = false }); } }
