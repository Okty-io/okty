import {SetupComponent} from './components/setup/setup.component';
import {SearchComponent} from './components/search/search.component';
import {DownloadComponent} from './components/download/download.component';
import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ReviewComponent} from './components/review/review.component';
import {EditContainerResolve} from './services/edit-container.resolve';
import {NewContainerResolve} from './services/new-container.resolve';

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
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'download',
    component: DownloadComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  }
];
