import { SetupComponent } from './components/setup/setup.component';
import { SearchComponent } from './components/search/search.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReviewComponent } from './components/review/review.component';
import { EditContainerResolve } from './services/edit-container.resolve';
import { NewContainerResolve } from './services/new-container.resolve';
import { SearchTemplatesResolve } from './services/search-templates.resolve';
import { SearchContainersResolve } from './services/search-containers.resolve';
import { TemplateComponent } from './components/template/template.component';
import { NewTemplateResolve } from './services/new-template.resolve';

export const routes: Routes = [
  {
    path: 'review',
    component: ReviewComponent,
  },
  {
    path: 'edit/:id',
    component: SetupComponent,
    resolve: {
      container: EditContainerResolve,
    }
  },
  {
    path: 'new/:id',
    component: SetupComponent,
    resolve: {
      container: NewContainerResolve,
    },
  },
  {
    path: 'template',
    component: SearchComponent,
    resolve: {
      results: SearchTemplatesResolve,
    }
  },
  {
    path: 'template/:id',
    component: TemplateComponent,
    resolve: {
      template: NewTemplateResolve,
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    resolve: {
      results: SearchContainersResolve
    }
  },
  {
    path: '**',
    component: HomeComponent,
  }
];
