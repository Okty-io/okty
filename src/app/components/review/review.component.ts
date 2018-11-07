import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { saveAs } from 'file-saver/FileSaver';
import { CustomTitleService } from '../../services/title.service';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  loading = false;

  constructor(private router: Router,
              private projectService: ProjectService,
              private titleService: CustomTitleService,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Review');

    if (this.projectService.getContainers().length <= 0) {
      this.router.navigate(['/']);
    }
  }

  goToAddContainer(): void {
    this.router.navigate(['/search']);
  }

  exportProject(): void {
    this.loading = true;
    const args = this.projectService.getBuildArgs();

    this.apiService.build(args).then(file => {
      saveAs(file, 'okty.zip');
      this.loading = false;
    });
  }
}
