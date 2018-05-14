import { Component, OnInit } from '@angular/core';
import { Container } from '../../models/container.model';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver/FileSaver';
import * as JSZip from 'jszip';

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
    const zip = new JSZip();

    zip.folder('DockerFile').file('test.txt', 'contenu vide');
    zip.file('download.txt', text);
    zip.file('README.txt', 'Octy - Licence MIT');
    zip.generateAsync({type: 'blob'})
      .then(function(content) {
        saveAs(content, 'example.zip');
      });
  }

}
