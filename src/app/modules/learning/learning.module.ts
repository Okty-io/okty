import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ChaptersComponent } from './pages/chapters/chapters.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [IndexComponent, ChaptersComponent],
    imports: [
        CommonModule,
        LearningRoutingModule,
        SharedModule,
    ]
})
export class LearningModule {
}
