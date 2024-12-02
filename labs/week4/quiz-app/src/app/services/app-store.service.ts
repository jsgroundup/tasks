import { computed, inject, Injectable, signal } from '@angular/core';
import { AppTypes } from '../interface/app';

const quizzesEndpoint = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  constructor() { }
  quizStore: {[k: string]: AppTypes['quiz']} = {}
  selection = signal<AppTypes['selectionType']>('')
  totalQuetions = signal(10)
  answeredQustions = signal(1)
  correctAnswers = signal(0)
  answerSubmitted = signal(false)
  quiz: AppTypes['quiz'] = {} as any
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
    this.answerSubmitted.set(false)
    this.totalQuetions.set(this.quiz.questions.length)
    this.answeredQustions.set(1)
    this.correctAnswers.set(0)
  }
  async loadQuiz(){ // {title}:{title: string}
    const title = this.quizType();
    const unAvailableResponse = {title, questions: []}
    // Check and return if quizzes are loaded already
    if(Object.keys(this.quizStore).length>1){
      this.quiz = this.quizStore[title.toLowerCase()]||unAvailableResponse;
      this.totalQuetions.set(this.quiz.questions.length)
      this.quizType.set(title)
      return
    };

    try {
      const quizzes: Array<AppTypes['quiz']> = await (await fetch(`${quizzesEndpoint}/quizzes`)).json()
      quizzes.forEach((quiz)=>{
        this.quizStore[quiz.title.toLowerCase()] = quiz
      })
      this.quiz = this.quizStore[title.toLowerCase()]||unAvailableResponse
    } catch (error) {
      this.quiz = unAvailableResponse
    }
    this.startNewQuiz(title)
  }
}
