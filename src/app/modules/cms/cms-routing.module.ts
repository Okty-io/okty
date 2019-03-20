import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: 'privacy',
        component: PrivacyComponent
    },
    {
        path: '',
        component: HomeComponent,
        data: {animation: 'HomePage'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CmsRoutingModule {
}
