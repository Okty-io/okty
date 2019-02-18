import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { OauthComponent } from './pages/oauth/oauth.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
    declarations: [LoginComponent, OauthComponent, ProfileComponent],
    imports: [
        CommonModule,
        UsersRoutingModule
    ]
})
export class UsersModule {
}
