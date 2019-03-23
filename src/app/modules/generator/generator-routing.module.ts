import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './pages/containers/containers.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { AddComponent } from './pages/add/add.component';
import { ReviewComponent } from './pages/review/review.component';
import { EditComponent } from './pages/edit/edit.component';
import { LoadComponent } from './pages/load/load.component';
import { LeaveGuard } from './guards/leave.guard';

const routes: Routes = [
    {
        path: '',
        children: [
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
                path: 'load/:id',
                component: LoadComponent
            },
            {
                path: 'review',
                component: ReviewComponent
            }
        ],
        canDeactivate: [
            LeaveGuard
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [LeaveGuard]
})
export class GeneratorRoutingModule {
}
