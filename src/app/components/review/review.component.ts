import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { saveAs } from 'file-saver/FileSaver';
import * as JSZip from 'jszip';

@Component({
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {

  constructor(private router: Router, private projectService: ProjectService) {
  }

  goToAddContainer(): void {
    this.router.navigate(['/search']);
  }

  exportProject(): void {
    const zip = new JSZip();

    zip.file('docker-compose.yaml', this.projectService.getDockerCompose());
    zip.file('README.txt', 'Octy - Licence MIT');
    zip.generateAsync({type: 'blob'})
      .then(function(content) {
        saveAs(content, 'docker.zip');
      });
  }

}
