import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ChaptersComponent } from './pages/chapters/chapters.component';

@NgModule({
    declarations: [IndexComponent, ChaptersComponent],
    imports: [
        CommonModule,
        LearningRoutingModule
    ]
})
export class LearningModule {
}
