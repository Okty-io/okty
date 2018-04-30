import {Component} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  containers: Array<any> = [
    {
      name: 'Php',
      image: 'https://cdn.worldvectorlogo.com/logos/php-1.svg'
    },
    {
      name: 'Node.js',
      image: 'https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png'
    },
    {
      name: 'Ruby',
      image: 'http://experiences-it.com/wp-content/uploads/2015/09/logoRuby.png'
    },
    {
      name: 'Python',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2000px-Python-logo-notext.svg.png'
    }
  ];
}
