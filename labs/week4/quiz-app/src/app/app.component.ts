import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionSectionComponent } from "./question-section/question-section.component";
import { AnswerSectionComponent } from "./answer-section/answer-section.component";
import { CommonModule } from '@angular/common';
import { QuizHeaderComponent } from "./quiz-header/quiz-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QuestionSectionComponent, AnswerSectionComponent, QuizHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
