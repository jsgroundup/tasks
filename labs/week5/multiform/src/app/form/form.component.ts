import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormInfoComponent } from "../form-info/form-info.component";
import { AppstoreService } from '../services/appstore.service';
import { FormPlanComponent } from "../form-plan/form-plan.component";

@Component({
  selector: 'formcontent',
  standalone: true,
  imports: [CommonModule, FormInfoComponent, FormPlanComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  appStoreService = inject(AppstoreService)
  SELECTIONS!: SELECTION

  constructor(){
    this.SELECTIONS = this.appStoreService.SELECTIONS
  }
}


type SELECTION = AppstoreService['SELECTIONS']
