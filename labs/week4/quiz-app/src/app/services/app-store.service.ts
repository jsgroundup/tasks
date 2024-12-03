import { computed, Injectable, signal } from '@angular/core';
import { AppTypes } from '../interface/app';
import { quizData } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  constructor() { }
  lightMode = signal(true)
  quizStore: {[k: string]: AppTypes['quiz']} = {}
  quiz: AppTypes['quiz'] = {
    title: '',
    questions: []
  }
  selection = signal<AppTypes['selectionType']>('')
  selectionValue = signal('')
  totalQuetions = signal(10)
  answeredQustions = signal(1)
  correctAnswers = signal(0)
  isCorrectAnswer = computed(()=>
    ((this.quiz.questions[this.answeredQustions()-1]?.answer||'').trim()===this.selectionValue())
  )
  answerSubmitted = signal(false)
  quizType = signal('')
  quizTypeSelected = computed(()=>this.quizType()!=='')
  endOfQuiz = computed(()=>this.answeredQustions()>=this.totalQuetions()&&this.quizTypeSelected())

  getSelection(){
    return this.selection
  }
  noSelection(){
    return this.selection()===''
  }
  startNewQuiz(title: string){
    this.quizType.set(title)
    this.selection.set('')
    this.selectionValue.set('')
    this.answerSubmitted.set(false)
    this.totalQuetions.set(this.quiz.questions.length)
    this.answeredQustions.set(1)
    // this.correctAnswers.set(0)
  }
  async loadQuiz(){
    const title = this.quizType();
    const unAvailableResponse = {title, questions: []}
    // Check and return if quizzes are loaded already
    if(Object.keys(this.quizStore).length>1){
      this.quiz = this.quizStore[title.toLowerCase()]||unAvailableResponse;
      this.startNewQuiz(title)
      return
    };
    const quizzes: Array<AppTypes['quiz']> =  quizData.quizzes;
    quizzes.forEach((quiz)=>{
      this.quizStore[quiz.title.toLowerCase()] = quiz
    })
    this.quiz = this.quizStore[title.toLowerCase()]||unAvailableResponse
    this.startNewQuiz(title)
  }
}
