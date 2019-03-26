import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    state: string;

    github: { url: string; clientId: string; scope: string; };
    gitlab: { url: string; clientId: string; scope: string, redirect: string; };

    githubUrl: string;
    gitlabUrl: string;

    constructor(private router: Router) {

    }

    ngOnInit() {
        this.initState();
        this.initGithub();
        this.initGitlab();
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

        this.githubUrl = `${this.github.url}
                            ?client_id=${this.github.clientId}
                            &scope=${this.github.scope}
                            &state=${this.state}`.replace(/ /g, '');
    }

    private initGitlab() {
        this.gitlab = {
            url: 'https://gitlab.com/oauth/authorize',
            clientId: environment.gitlab.clientId,
            scope: ['read_user'].join('%20'),
            redirect: location.origin + this.router.createUrlTree(['/', 'users', 'login', 'gitlab']).toString()
        };

        this.gitlabUrl = `${this.gitlab.url}
                            ?client_id=${this.gitlab.clientId}
                            &state=${this.state}
                            &redirect_uri=${this.gitlab.redirect}
                            &scope=${this.gitlab.scope}
                            &response_type=code`.replace(/ /g, '');
    }
}
