import { Component, Input, OnInit } from '@angular/core';
import Lesson from '../../models/lesson';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-learning-lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

    @Input() lesson: Lesson;

    public completedIcon = faCheck;
    public isCompleted: boolean;

    constructor() {
    }

    ngOnInit() {
        this.isCompleted = false;
    }

}
