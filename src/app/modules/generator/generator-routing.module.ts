import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './pages/containers/containers.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { AddComponent } from './pages/add/add.component';
import { ReviewComponent } from './pages/review/review.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
    {
        path: 'containers',
        component: ContainersComponent
    },
    {
        path: 'templates',
        component: TemplatesComponent
    },
    {
        path: 'add/:id',
        component: AddComponent
    },
    {
        path: 'edit/:id',
        component: EditComponent
    },
    {
        path: 'review',
        component: ReviewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeneratorRoutingModule {
}
