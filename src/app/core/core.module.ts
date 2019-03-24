import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        NgcCookieConsentModule,
        InlineSVGModule.forRoot()
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
    ]
})
export class CoreModule {
}
