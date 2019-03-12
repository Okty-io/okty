import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { PageIllustrationComponent } from './components/page-illustration/page-illustration.component';

@NgModule({
    declarations: [
        HomeComponent,
        PageIllustrationComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        HttpClientModule,
        InlineSVGModule.forRoot()
    ]
})
export class HomeModule {
}
