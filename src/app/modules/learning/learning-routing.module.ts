import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ChaptersComponent } from './pages/chapters/chapters.component';
import { LessonComponent } from './pages/lesson/lesson.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'chapters',
        component: ChaptersComponent
    },
    {
        path: 'chapters/:id/:lesson',
        component: LessonComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
