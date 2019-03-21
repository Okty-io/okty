import { NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { environment } from '../../../environments/environment';

export const cookieConfig: NgcCookieConsentConfig = {
    'cookie': {
        'domain': environment.cookie.domain,
    },
    'position': 'bottom-right',
    'theme': 'classic',
    'palette': {
        'popup': {
            'background': '#2B2B2B',
            'text': '#ffffff',
            'link': '#ffffff'
        },
        'button': {
            'background': '#3d65c2',
            'text': '#fff',
            'border': 'transparent'
        }
    },
    'type': 'info',
    'content': {
        'message': 'This website uses cookies to ensure you get the best experience on our website.',
        'dismiss': 'Got it!',
        'deny': 'Decline',
        'link': 'Learn more',
        'href': 'https://okty.io/privacy',
        'policy': 'Cookie Policy',
        'header': 'Cookies used on the website!',
        'allow': 'Allow cookies'
    }
};
