import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorRoutingModule } from './generator-routing.module';
import { ContainersComponent } from './pages/containers/containers.component';
import { TemplatesComponent } from './pages/templates/templates.component';

@NgModule({
  declarations: [ContainersComponent, TemplatesComponent],
  imports: [
    CommonModule,
    GeneratorRoutingModule
  ]
})
export class GeneratorModule { }
