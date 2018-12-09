import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './pages/containers/containers.component';
import { TemplatesComponent } from './pages/templates/templates.component';

const routes: Routes = [
    {
        path: 'containers',
        component: ContainersComponent
    },
    {
        path: 'templates',
        component: TemplatesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeneratorRoutingModule {
}
