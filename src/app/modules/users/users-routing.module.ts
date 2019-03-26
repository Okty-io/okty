import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OauthComponent } from './pages/oauth/oauth.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { IsNotLoggedIn } from './guards/isNotLoggedIn';
import { IsLoggedIn } from './guards/isLoggedIn';

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
        component: ProfileComponent,
        canActivate: [
            IsLoggedIn
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [IsNotLoggedIn, IsLoggedIn],
})
export class UsersRoutingModule {
}
