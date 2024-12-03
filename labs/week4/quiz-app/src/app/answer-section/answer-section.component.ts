import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ChoiceCardComponent } from "../choice-card/choice-card.component";
import { CommonModule } from '@angular/common';
import { AppStoreService } from '../services/app-store.service';

@Component({
  selector: 'answer-section.stage-section',
  standalone: true,
  imports: [CommonModule,ChoiceCardComponent],
  templateUrl: './answer-section.component.html',
  styleUrl: './answer-section.component.css'
})
export class AnswerSectionComponent {
  selectionIsCorrect = false
  timing: any = undefined
  appStoreService = inject(AppStoreService)
  buttonClicked = signal(false)

  showSelectionWarning = computed(()=>{
    clearTimeout(this.timing) // Stop previous scheduled event if any
    return this.appStoreService.noSelection()&&this.buttonClicked()
  })

  onButtonClicked(){
    if(this.appStoreService.endOfQuiz()){
      this.appStoreService.startNewQuiz('')
      return;
    }
    this.buttonClicked.set(true);

    if(this.showSelectionWarning()){
      //Schedule new event to hide warning after 3 seconds
      this.timing = setTimeout(() => {
        this.buttonClicked.set(false);
      }, 3000);
      return
    }

    this.buttonClicked.set(false);
    if(!this.appStoreService.answerSubmitted()){
      this.appStoreService.answerSubmitted.set(true)
      if(this.appStoreService.isCorrectAnswer()){
        this.appStoreService.correctAnswers.set(this.appStoreService.correctAnswers()+1)
      }
    }else{
      this.appStoreService.selection.set('')
      this.appStoreService.answerSubmitted.set(false)
      this.appStoreService.answeredQustions.set(this.getAnsweredQustions()+1)
    }
  }
  getCurrentQuestionAnswerOptions(index: number){
    return this.appStoreService.quiz.questions.at(this.getAnsweredQustions()-1)?.options[index]||'N/A'
  }
  getCurrentQuestionAnswer(){
    return this.appStoreService.quiz.questions.at(this.getAnsweredQustions()-1)?.answer
  }
  getAnsweredQustions(){
    return this.appStoreService.answeredQustions()
  }
  getTotalQuetions(){
    return this.appStoreService.totalQuetions()
  }
}
