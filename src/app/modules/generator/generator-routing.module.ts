import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './pages/containers/containers.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { ContainersResolver } from '../../core/resolvers/containers.resolver';

const routes: Routes = [
    {
        path: 'containers',
        component: ContainersComponent,
        resolve: {
            containers: ContainersResolver
        }
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
