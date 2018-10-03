// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { SetupComponent } from './components/setup/setup.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { VoidComponent } from './components/setup/form/void.component';
import { InputComponent } from './components/setup/form/input/input.component';
import { ReviewComponent } from './components/review/review.component';
import { MultiSelectComponent } from './components/setup/form/multi-select/multi-select.component';
import { SelectComponent } from './components/setup/form/select/select.component';
import { SelectContainerComponent } from './components/setup/form/select-container/select-container.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TemplateComponent } from './components/template/template.component';

// Providers
import { NewContainerResolve } from './services/new-container.resolve';
import { EditContainerResolve } from './services/edit-container.resolve';
import { ProjectService } from './services/project.service';
import { CacheService } from './services/cache.service';
import { SidebarService } from './services/sidebar.service';
import { MessageService } from './services/message.service';
import { CustomTitleService } from './services/title.service';
import { ContainerValidator } from './validators/container.validator';
import { SearchTemplatesResolve } from './services/search-templates.resolve';
import { SearchContainersResolve } from './services/search-containers.resolve';
import { NewTemplateResolve } from './services/new-template.resolve';
import { ContainerService } from './services/container.service';
import { ApiService } from './services/api.service';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { ValidatorErrorsPipe } from './pipes/validator-errors.pipe';

// Directives
import { FormInputDirective } from './directives/form-input.directive';

// Routes
import { routes } from './app.routes';

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
    SelectComponent,
    VoidComponent,
    ReviewComponent,
    MultiSelectComponent,
    SelectContainerComponent,
    ValidatorErrorsPipe,
    NotificationComponent,
    TemplateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    NewContainerResolve,
    EditContainerResolve,
    ProjectService,
    CacheService,
    SidebarService,
    MessageService,
    CustomTitleService,
    ContainerValidator,
    SearchTemplatesResolve,
    SearchContainersResolve,
    NewTemplateResolve,
    ContainerService,
    ApiService,
  ],
  entryComponents: [
    InputComponent,
    SelectComponent,
    MultiSelectComponent,
    VoidComponent,
    SelectContainerComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
