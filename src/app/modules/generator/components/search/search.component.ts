import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Listable } from '../../interfaces/listable';
import { AnalyticsService } from '../../../../core/services/analytics.service';

@Component({
    selector: 'app-generator-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    @Input() elements: Listable[];
    @Output() outputSearch: EventEmitter<Listable[]> = new EventEmitter<Listable[]>();

    private displayed: Listable[];
    private subscribeSearch;

    searchControl: FormControl;

    constructor(private analytics: AnalyticsService) {
    }

    ngOnInit(): void {
        this.searchControl = new FormControl();

        this.subscribeSearch = this.searchControl.valueChanges.subscribe((value: string) => {
            if (!this.elements) {
                return;
            }

            this.displayed = this.elements.filter((element) => element.getTitle().toLowerCase().includes(value.toLowerCase()));
            this.outputSearch.emit(this.displayed);

            this.analytics.search(value);
        });
    }

    ngOnDestroy(): void {
        this.subscribeSearch.unsubscribe();
    }
}
