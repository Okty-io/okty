import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        NgcCookieConsentModule
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
    ]
})
export class CoreModule {
}
