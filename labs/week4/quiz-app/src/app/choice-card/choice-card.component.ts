import { Component, computed, HostBinding, HostListener, inject, Input } from '@angular/core';
import { AppTypes } from '../interface/app';
import { AppStoreService } from '../services/app-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'choice-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choice-card.component.html',
  styleUrl: './choice-card.component.css'
})
export class ChoiceCardComponent {
  @HostBinding('class') get dynamicClassNames(){
    const selected = this.isSelected()
    const correct = this.appStoreService.isCorrectAnswer()
    const submitted = this.appStoreService.answerSubmitted()
    return {
      neutral: !selected,
      correct: selected&&submitted&&correct,
      wrong: selected&&submitted&&!correct,
      selected: this.quizTypeSelected()&&selected
    }
  }
  @HostListener('click') onClick(){
    if(this.appStoreService.answerSubmitted()) return
    if(!this.quizTypeSelected()){
      this.appStoreService.quizType.set(this.defaultLabel)
      this.appStoreService.loadQuiz()
      return
    }
    this.appStoreService.selection.set(this.value)
    this.appStoreService.selectionValue.set(this.label.trim());
  }
  @Input({required: true}) value: AppTypes['selectionType'] = ''
  @Input({required: true}) label: string = ''
  @Input({required: true}) defaultLabel: string = ''
  appStoreService = inject(AppStoreService)
  quizTypeSelected(){
    return this.appStoreService.quizTypeSelected()
  }
  isCorrectAnswer(){
    return (this.appStoreService.quiz.questions[this.appStoreService.answeredQustions()-1]?.answer||'').trim()===this.label.trim()
  }
  isSelected(){
    return this.appStoreService.selection()===this.value
  }
  passedCorrectAnswerRequirements(){
    return this.appStoreService.isCorrectAnswer()
  }
}
