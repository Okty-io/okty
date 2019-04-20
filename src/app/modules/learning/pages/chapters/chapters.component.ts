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

    public chapters = [];
    private chapterSubscription: Subscription;

    constructor(private chapterRepository: ChapterRepository) {
    }

    ngOnInit() {
        this.chapterSubscription = this.chapterRepository.getAll()
            .subscribe((chapters: Chapter[]) => {
                this.chapters = chapters;
            });
    }

    ngOnDestroy(): void {
        this.chapterSubscription.unsubscribe();
    }
}
