import { Injectable, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const SELECTIONS = {INFO: 1, PLAN: 2, ADDONS: 3, SUMMARY: 4}

@Injectable({
  providedIn: 'root'
})

export class AppstoreService {
  constructor(){
    // Read form progress from local storage and resume from where user left
    try {
      let storedProgress = window.localStorage.getItem('formdata')
      if(storedProgress){
        const progress = JSON.parse(storedProgress) as AppstoreService&{info: FormValue}
        this.selected = progress.selected
        this.planCategory = progress.planCategory
        this.planType = progress.planType
        this.detailsConfirmed = progress.detailsConfirmed
        this.userPersonalInfo().controls.name.setValue(progress.info.name)
        this.userPersonalInfo().controls.email.setValue(progress.info.email)
        this.userPersonalInfo().controls.phone.setValue(progress.info.phone)

      }
    } catch (error) {}

    // Save user info from input fields in the local storage
    this.userPersonalInfo().valueChanges.subscribe(info=>{
      this.saveToLocalStorage()
    })
  }

  SELECTIONS = SELECTIONS
  selected = SELECTIONS.INFO
  planCategory: 'arcade'|'advanced'|'pro' = 'arcade'
  planType: 'yearly'|'monthly' = 'monthly'
  detailsConfirmed = false

  prices = {
    monthly: {arcade: 9, advanced: 12, pro: 15},
    yearly: {arcade: 90, advanced: 120, pro: 150},
  }

  addons = [
    {
      title: 'Online service',
      desc: 'Access to multiplayer games',
      price: 1,
      selected: false
    },
    {
      title: 'Larger storage',
      desc: 'Extra 1TB of cloud save',
      price: 2,
      selected: false
    },
    {
      title: 'Customizable profile',
      desc: 'Custom theme on your profile',
      price: 2,
      selected: false
    },
  ]

  userPersonalInfo = signal(new FormGroup({
    name : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(64),
    ]),
    email : new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.minLength(3),
      Validators.maxLength(64)
    ]),
    phone : new FormControl('',[
      Validators.required,
      Validators.min(10),
      Validators.maxLength(15),
    ])
  }))

  saveToLocalStorage(){
    const userinfo = this.userPersonalInfo().getRawValue();
    window.localStorage.setItem('formdata',JSON.stringify({
      selected: this.selected,
      planCategory: this.planCategory,
      planType: this.planType,
      detailsConfirmed: this.detailsConfirmed,
      info: {
        name: userinfo.name||'',
        email: userinfo.email||'',
        phone: userinfo.phone||''
      }
    }))
  }

}


type FormValue = {
  name: string | null;
  email: string | null;
  phone: string | null;
}

type PersonalInfo = FormGroup<{
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}>
