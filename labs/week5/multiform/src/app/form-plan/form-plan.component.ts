import { Component, inject } from '@angular/core';
import { AppstoreService } from '../services/appstore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-plan.content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-plan.component.html',
  styleUrl: './form-plan.component.css'
})
export class FormPlanComponent {
  appStoreService = inject(AppstoreService)

  get prices(){
    return this.appStoreService.prices
  }

  //Methods
  onToggle(){
    const {planType} = this.appStoreService
    this.appStoreService.planType = planType === 'monthly'?'yearly':'monthly'
  }

  onCategoryClick(planCategory:'arcade'|'advanced'|'pro'){
    this.appStoreService.planCategory = planCategory
  }
}
