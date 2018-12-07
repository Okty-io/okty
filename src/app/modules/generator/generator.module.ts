import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorRoutingModule } from './generator-routing.module';
import { ContainersComponent } from './pages/containers/containers.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [ContainersComponent, TemplatesComponent, SearchComponent, ListComponent],
  imports: [
    CommonModule,
    GeneratorRoutingModule
  ]
})
export class GeneratorModule { }
