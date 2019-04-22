import { Component, OnInit } from '@angular/core';
import { LessonRepository } from '../../repositories/lesson.repository';
import { ActivatedRoute } from '@angular/router';
import Lesson from '../../models/lesson';

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

    public loading: boolean;
    public lesson: Lesson;

    constructor(private lessonRepository: LessonRepository, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.loading = true;
        this.initSteps();
    }

    private initSteps(): void {
        this.activatedRoute.params.subscribe((data) => {
            this.lessonRepository.getByChapterAndStepNumber(data.id, data.lesson).then((lesson: Lesson) => {
                this.lesson = lesson;
                this.loading = false;
            });
        });
    }

}
