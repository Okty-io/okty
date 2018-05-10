import {SetupComponent} from './components/setup/setup.component';
import {SearchComponent} from './components/search/search.component';
import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ContainerResolve} from './services/container.resolve';
import {ReviewComponent} from './components/review/review.component';

export const routes: Routes = [
  {
    path: 'review',
    component: ReviewComponent,
  },
  {
    path: 'setup/:id',
    component: SetupComponent,
    resolve: {
      container: ContainerResolve,
    },
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  }
];
