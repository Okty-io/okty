import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorRoutingModule } from './generator-routing.module';
import { ContainersComponent } from './pages/containers/containers.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './pages/add/add.component';
import { FormFieldDirective } from './directives/form-field.directive';
import { VoidComponent } from './components/fields/void/void.component';
import { InputComponent } from './components/fields/input/input.component';
import { CheckboxComponent } from './components/fields/checkbox/checkbox.component';
import { SelectSingleComponent } from './components/fields/select-single/select-single.component';
import { SelectMultipleComponent } from './components/fields/select-multiple/select-multiple.component';
import { SelectContainerComponent } from './components/fields/select-container/select-container.component';
import { OnlyVisibleFieldPipe } from './directives/only-visible-field.pipe';
import { FormComponent } from './components/form/form.component';
import { ValidatorErrorsPipe } from './directives/validator-errors.pipe';
import { ReviewComponent } from './pages/review/review.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ContainerRepository } from './repositories/container.repository';
import { TemplateRepository } from './repositories/template.repository';
import { ContainerService } from './services/container.service';
import { FormService } from './services/form.service';
import { SessionService } from './services/session.service';
import { EditComponent } from './pages/edit/edit.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContainerValidators } from './validators/container.validators';
import { ProjectRepository } from './repositories/project.repository';
import { LoadComponent } from './pages/load/load.component';
import { HighlightModule } from 'ngx-highlightjs';
import { SharedModule } from '../../shared/shared.module';
import { FormActionComponent } from './components/form-action/form-action.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReviewActionComponent } from './components/review-action/review-action.component';
import { ReviewGridComponent } from './components/review-grid/review-grid.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
    declarations: [
        ContainersComponent,
        TemplatesComponent,
        SearchComponent,
        ListComponent,
        AddComponent,
        FormFieldDirective,
        OnlyVisibleFieldPipe,
        ValidatorErrorsPipe,
        VoidComponent,
        InputComponent,
        CheckboxComponent,
        SelectSingleComponent,
        SelectMultipleComponent,
        SelectContainerComponent,
        FormComponent,
        ReviewComponent,
        PreviewComponent,
        EditComponent,
        SidebarComponent,
        LoadComponent,
        ReviewActionComponent,
        ReviewGridComponent,
        FormActionComponent,
        CardComponent,
    ],
    imports: [
        CommonModule,
        GeneratorRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule,
        SharedModule,
        NgSelectModule,
        FontAwesomeModule,
    ],
    providers: [
        ContainerRepository,
        TemplateRepository,
        ProjectRepository,
        ContainerService,
        FormService,
        SessionService,
        ContainerValidators,
    ],
    entryComponents: [
        VoidComponent,
        InputComponent,
        CheckboxComponent,
        SelectSingleComponent,
        SelectMultipleComponent,
        SelectContainerComponent,
    ]
})
export class GeneratorModule {
}
