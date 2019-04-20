import { Component, Input, OnInit } from '@angular/core';
import Chapter from '../../models/chapter';

@Component({
    selector: 'app-learning-chapter',
    templateUrl: './chapter.component.html',
    styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {

    @Input() chapter: Chapter;

    constructor() {
    }

    ngOnInit() {
    }

}
