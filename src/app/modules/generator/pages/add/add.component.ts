import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerService } from '../../../../core/services/container.service';
import { ActivatedRoute } from '@angular/router';
import { Container } from '../../../../core/models/container';
import { FormGroup } from '@angular/forms';

@Component({
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

    private subscribeContainer;

    container: Container;
    data: FormGroup;
    error: string;

    constructor(private containerService: ContainerService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.subscribeContainer = this.containerService.getOne(this.route.snapshot.params.id)
            .subscribe(
                (container: Container) => this.container = container,
                (error: string) => this.error = error
            );
    }

    ngOnDestroy(): void {
        this.subscribeContainer.unsubscribe();
    }

    submit(): void {
        console.log(this.data);
        console.log(this.data.valid);
    }
}
