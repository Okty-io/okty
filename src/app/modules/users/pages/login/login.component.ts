import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    state: string;
    github: { url: string; clientId: string; scope: string; };

    githubUrl: string;

    ngOnInit() {
        this.initState();
        this.initGithub();
    }

    private initState() {
        this.state = 's3cr3t_r@nD0m';
        localStorage.setItem('api_state', this.state);
    }

    private initGithub() {
        this.github = {
            url: 'https://github.com/login/oauth/authorize',
            clientId: environment.github.clientId,
            scope: ['read:user', 'user:email'].join('%20')
        };

        this.githubUrl = `${this.github.url}?client_id=${this.github.clientId}&scope=${this.github.scope}&state=${this.state}`;
    }

}
