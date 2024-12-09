import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'form-info.content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-info.component.html',
  styleUrl: './form-info.component.css'
})
export class FormInfoComponent {
  requiredInputValue = 0
}
