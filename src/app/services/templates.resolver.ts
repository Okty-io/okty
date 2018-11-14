import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';

@Injectable()
export class TemplatesResolver implements Resolve<any> {
    resolve(): any {
        return undefined;
    }
}
