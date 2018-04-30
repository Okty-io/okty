import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  public ngOnInit(): void {
    const BASE_URL = 'https://api.github.com';
    const filePath = 'containers/nginx.yaml';

    const url = BASE_URL + '/repos/lbassin/dockerize-config/contents/' + filePath;

    this.http.get(url).toPromise().then((file: { content: string }) => {
      const content = atob(file.content);
      const nativeObject = YAML.parse(content);

      console.log(nativeObject);
    });

    console.log('test');
  }
}
