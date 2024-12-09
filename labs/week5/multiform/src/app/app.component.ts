import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavPanelComponent } from "./nav-panel/nav-panel.component";
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavPanelComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'multiform';
}
