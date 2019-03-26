import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button.component';
import { LoaderComponent } from './components/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        ButtonComponent,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        ButtonComponent,
        LoaderComponent
    ]
})
export class SharedModule {
}
