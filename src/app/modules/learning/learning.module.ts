import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ChaptersComponent } from './pages/chapters/chapters.component';
import { SharedModule } from '../../shared/shared.module';
import { ProgressComponent } from './components/progress/progress.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { ChapterRepository } from './repositories/chapter.repository';

@NgModule({
    declarations: [
        IndexComponent,
        ChaptersComponent,
        ProgressComponent,
        ChapterComponent,
        LessonComponent
    ],
    imports: [
        CommonModule,
        LearningRoutingModule,
        SharedModule,
    ],
    providers: [
        ChapterRepository
    ]
})
export class LearningModule {
}
