import { Component, OnInit } from '@angular/core';
import { Container } from '../../models/container.model';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {

  container: Container;

  constructor(private route: ActivatedRoute
  ) {
    this.container = route.snapshot.data.container;
  }

  ngOnInit(): void {
  }

  saveFile(text): void {
    const filename = 'test.txt';
    const blob = new Blob([text], { type: 'text/plain' });
    saveAs(blob, filename);
  }

}
