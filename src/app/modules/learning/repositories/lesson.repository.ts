import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import Lesson from '../models/lesson';

@Injectable()
export class LessonRepository {

    constructor(private api: ApiService) {
    }

    public getByChapterAndStepNumber(chapterId: String, lessonNumber: string): Promise<Lesson> {
        return this.api.get(`learning/chapters/${chapterId}/lessons`).toPromise()
            .then(data => {
                const id = data.find(lesson => lesson.position === parseInt(lessonNumber, 10)).id;
                return this.api.get(`learning/chapters/${chapterId}/lessons/${id}`).toPromise();
            });
    }
}
