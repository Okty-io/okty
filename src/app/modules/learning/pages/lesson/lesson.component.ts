import { Component, OnInit } from '@angular/core';
import { LessonRepository } from '../../repositories/lesson.repository';
import { ActivatedRoute, Router } from '@angular/router';
import Lesson from '../../models/lesson';

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

    public loading: boolean;
    public lesson: Lesson;

    constructor(private lessonRepository: LessonRepository, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.loading = true;
        this.initSteps();
    }

    private initSteps(): void {
        this.activatedRoute.params.subscribe((data) => {
            this.lessonRepository.getByChapterAndStepNumber(data.id, data.lesson).then((lesson: Lesson) => {
                this.lesson = lesson;
                this.lesson.steps.map((step) => step.validated = !step.action);

                this.loading = false;
            });
        });
    }

    handleEnd = () => {
        this.router.navigate(['/learning', 'chapters']);
    }
}
