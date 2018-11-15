import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ContainersResolver } from './core/resolvers/containers.resolver';
import { TemplatesResolver } from './core/resolvers/templates.resolver';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule
    ],
    providers: [
        ContainersResolver,
        TemplatesResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
