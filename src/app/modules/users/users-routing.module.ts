import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OauthComponent } from './pages/oauth/oauth.component';
import { ProfileComponent } from './pages/profile/profile.component';
import IsNotLoggedIn from './guards/isNotLoggedIn';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [
            IsNotLoggedIn
        ]
    },
    {
        path: 'login/:provider',
        component: OauthComponent,
        canActivate: [
            IsNotLoggedIn
        ]
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [IsNotLoggedIn],
})
export class UsersRoutingModule {
}
