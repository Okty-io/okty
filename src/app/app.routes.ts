import {SetupComponent} from './components/setup/setup.component';
import {SearchComponent} from './components/search/search.component';
import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ContainerResolve} from './services/container.resolve';

export const routes: Routes = [
  {
    path: 'setup/:id',
    component: SetupComponent,
    resolve: {
      container: ContainerResolve,
    }
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
