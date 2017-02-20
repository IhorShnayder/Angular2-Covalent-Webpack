import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { StepState } from '@covalent/core';

import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
    stateStep2: StepState = StepState.Required;
    stateStep3: StepState = StepState.Complete;
    disabled: boolean = false;

    toggleRequiredStep2(): void {
        this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
    }

    toggleCompleteStep3(): void {
        this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
    }

    activeStep1Event(): void {
        this.activeDeactiveStep1Msg = 'Active event emitted.';
    }

    deactiveStep1Event(): void {
        this.activeDeactiveStep1Msg = 'Deactive event emitted.';
    }


    title: string = 'Angular2 Universal & ASP.NET Core advanced starter-kit';

    // Use "constructor"s only for dependency injection
    constructor () {
    }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit () {
        console.log('Are we inside the Browser ? ' + isBrowser);
    }
}
