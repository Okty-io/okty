// Modules
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

// Components
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {SetupComponent} from './components/setup/setup.component';
import {SidebarComponent} from './components/setup/sidebar/sidebar.component';

// Providers
import {ContainerService} from './services/container.service';
import {ContainerResolve} from './services/container.resolve';
import {ProjectService} from './services/project.service';
import {CacheService} from './services/cache.service';

// Pipes
import {FilterPipe} from './pipes/filter.pipe';

// Routes
import {routes} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FilterPipe,
    SetupComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ContainerService,
    ContainerResolve,
    ProjectService,
    CacheService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
