// Modules
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
// Components
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {SetupComponent} from './components/setup/setup.component';
// Providers
import {ContainerService} from './services/container.service';
import {ContainerResolve} from './services/container.resolve';
// Routes
import {routes} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    SetupComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [
    ContainerService,
    ContainerResolve,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
