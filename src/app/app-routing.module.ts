import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'generator',
        loadChildren: './modules/generator/generator.module#GeneratorModule'
    },
    {
        path: 'users',
        loadChildren: './modules/users/users.module#UsersModule'
    },
    {
        path: '',
        loadChildren: './modules/home/home.module#HomeModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
