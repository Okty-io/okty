// Modules
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

// Components
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';

// Providers
import {ContainerService} from './services/container.service';

// Routing
const appRoutes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    ContainerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
