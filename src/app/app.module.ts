import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/services/api.service';
import { TitleService } from './core/services/title.service';
import { HighlightModule } from 'ngx-highlightjs';

import yaml from 'highlight.js/lib/languages/yaml';
import { SharedModule } from './shared/shared.module';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { cookieConfig } from './core/configs/cookie-consent';

export function hljsLanguages() {
    return [{name: 'yaml', func: yaml}];
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        HighlightModule.forRoot({languages: hljsLanguages}),
        NgcCookieConsentModule.forRoot(cookieConfig)
    ],
    providers: [
        ApiService,
        TitleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
