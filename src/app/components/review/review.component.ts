import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { saveAs } from 'file-saver/FileSaver';
import * as JSZip from 'jszip';
import { CustomTitleService } from '../../services/title.service';

@Component({
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(private router: Router, private projectService: ProjectService, private titleService: CustomTitleService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Review');
  }

  goToAddContainer(): void {
    this.router.navigate(['/search']);
  }

  exportProject(): void {
    const zip = new JSZip();

    zip.file('docker-compose.yml', this.projectService.getDockerCompose());
    zip.file('README.txt', 'License\n' +
      'Okty is made available under the MIT License.\n' +
      '\n' +
      'Credits\n' +
      'Okty is created and maintained by Samuel Alves Antunes, Laurent Bassin, Maxime Marquet & Jordan Venant.\n' +
      '\n' +
      'We\'re open to suggestions, feel free to message us or open an issue.\n' +
      'Pull requests are also welcome!');
    zip.generateAsync({type: 'blob'})
      .then(function (content) {
        saveAs(content, 'docker.zip');
      });
  }

}
