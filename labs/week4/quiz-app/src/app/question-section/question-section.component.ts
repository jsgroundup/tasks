import { Component, inject, Input, OnInit } from '@angular/core';
import { AppStoreService } from '../services/app-store.service';

@Component({
  selector: 'question-section.stage-section',
  standalone: true,
  imports: [],
  templateUrl: './question-section.component.html',
  styleUrl: './question-section.component.css'
})
export class QuestionSectionComponent implements OnInit {
  appStoreService = inject(AppStoreService)
  async ngOnInit(){
    this.appStoreService.loadQuiz();
  }
  getProgressBarStyle(){
    return `width:${(this.getAnsweredQustions()/this.getTotalQuetions())*100}%;`
  }
  getCurrentQuestion(){
    return this.appStoreService.quiz.questions.at(this.getAnsweredQustions()-1)?.question
  }
  getAnsweredQustions(){
    return this.appStoreService.answeredQustions()
  }
  getTotalQuetions(){
    return this.appStoreService.totalQuetions()
  }
}
