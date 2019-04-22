import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChapterRepository } from '../../repositories/chapter.repository';
import Chapter from '../../models/chapter';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chapters',
    templateUrl: './chapters.component.html',
    styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnInit, OnDestroy {

    public percentage: number;
    public chapters: Chapter[];
    private chapterSubscription: Subscription;

    constructor(private chapterRepository: ChapterRepository) {
    }

    ngOnInit() {
        this.percentage = 0;
        this.chapters = [];

        this.chapterSubscription = this.chapterRepository.getAll()
            .subscribe((chapters: Chapter[]) => {
                this.chapters = chapters;
            });
    }

    ngOnDestroy(): void {
        this.chapterSubscription.unsubscribe();
    }
}
