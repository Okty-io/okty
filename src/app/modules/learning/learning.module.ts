import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
    declarations: [IndexComponent],
    imports: [
        CommonModule,
        LearningRoutingModule
    ]
})
export class LearningModule {
}
