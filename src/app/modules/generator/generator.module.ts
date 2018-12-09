import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorRoutingModule } from './generator-routing.module';
import { ContainersComponent } from './pages/containers/containers.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './pages/add/add.component';

@NgModule({
    declarations: [ContainersComponent, TemplatesComponent, SearchComponent, ListComponent, AddComponent],
    imports: [
        CommonModule,
        GeneratorRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class GeneratorModule {
}
