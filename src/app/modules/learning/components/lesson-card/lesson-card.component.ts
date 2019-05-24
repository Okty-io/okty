import { Component, Input, OnInit } from '@angular/core';
import Lesson from '../../models/lesson';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-learning-lesson',
    templateUrl: './lesson-card.component.html',
    styleUrls: ['./lesson-card.component.scss']
})
export class LessonCardComponent implements OnInit {

    @Input() lesson: Lesson;

    public completedIcon = faCheck;
    public isCompleted: boolean;

    constructor() {
    }

    ngOnInit() {
        this.isCompleted = false;
    }

}
