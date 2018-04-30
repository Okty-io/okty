import {Component, OnInit} from '@angular/core';
import {ContainerService} from '../../services/container.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

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

  constructor(private containerService: ContainerService) {
  }

  public ngOnInit(): void {
    this.containerService.getAvailableContainers().then(response => console.log(response));
  }
}
