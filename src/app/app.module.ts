// Modules
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Components
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {SetupComponent} from './components/setup/setup.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {PortComponent} from './components/setup/form/port/port.component';
import {VoidComponent} from './components/setup/form/void.component';
import {InputComponent} from './components/setup/form/input/input.component';
import {ReviewComponent} from './components/review/review.component';

// Providers
import {ContainerService} from './services/container.service';
import {NewContainerResolve} from './services/new-container.resolve';
import {EditContainerResolve} from './services/edit-container.resolve';
import {ProjectService} from './services/project.service';
import {CacheService} from './services/cache.service';
import {SidebarService} from './services/sidebar.service';

// Pipes
import {FilterPipe} from './pipes/filter.pipe';

// Directives
import {FormInputDirective} from './directives/form-input.directive';

// Routes
import {routes} from './app.routes';
import { SelectizeComponent } from './components/setup/form/selectize/selectize.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FilterPipe,
    SetupComponent,
    SidebarComponent,
    FormInputDirective,
    InputComponent,
    PortComponent,
    VoidComponent,
    ReviewComponent,
    SelectizeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ContainerService,
    NewContainerResolve,
    EditContainerResolve,
    ProjectService,
    CacheService,
    SidebarService,
  ],
  entryComponents: [
    InputComponent,
    PortComponent,
    VoidComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
