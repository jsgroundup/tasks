import { Component, inject } from '@angular/core';
import { AppstoreService } from '../services/appstore.service';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [],
  templateUrl: './nav-panel.component.html',
  styleUrl: './nav-panel.component.css'
})

export class NavPanelComponent {
  appStoreService = inject(AppstoreService)
  SELECTIONS!: SELECTION

  // Methods
  constructor(){
    this.SELECTIONS = this.appStoreService.SELECTIONS
  }
  select(selection: SELECTION[keyof SELECTION]){
    this.appStoreService.selected = selection
    this.appStoreService.saveToLocalStorage()
  }

  onItemSelectedWithKeyboard(e: KeyboardEvent, selection: SELECTION[keyof SELECTION]){
    if(e.key.toLowerCase()==='enter'){
      this.select(selection)
    }
  }
}



type SELECTION = AppstoreService['SELECTIONS']

