import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ChaptersComponent } from './pages/chapters/chapters.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'chapters',
        component: ChaptersComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
