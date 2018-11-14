import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ContainersResolver } from './core/resolvers/containers.resolver';
import { TemplatesResolver } from './core/resolvers/templates.resolver';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { HomeModule } from './modules/home/home.module';
import { GeneratorModule } from './modules/generator/generator.module';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        CoreModule,
        HomeModule,
        GeneratorModule
    ],
    providers: [
        ContainersResolver,
        TemplatesResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
