import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppStoreService } from '../services/app-store.service';

@Component({
  selector: 'quiz-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-header.component.html',
  styleUrl: './quiz-header.component.css'
})
export class QuizHeaderComponent {
  appStoreService = inject(AppStoreService)
  themeMode: 'dark'|'light' = 'light'
  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (e) => {
      this.setTheme(e.matches ? 'dark' : 'light');
    });
    const storageTheme = window.localStorage.getItem('theme')||'light'
    const darkMode = storageTheme === 'dark';
    this.setTheme(prefersDark.matches||darkMode ? 'dark' : 'light')
  }

  setTheme(theme: 'dark'|'light') {
      document.documentElement.setAttribute('data-theme', theme);
      window.localStorage.setItem('theme', theme);
      this.themeMode = theme
      this.appStoreService.lightMode.set(theme==='light')
  }

  onToggle(){
    this.setTheme(this.themeMode === 'dark' ? 'light' : 'dark')
  }
}



