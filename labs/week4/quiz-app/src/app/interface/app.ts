export interface AppTypes {
  selectionType : ''|'a'|'b'|'c'|'d'
  quiz: {
    title: string;
    questions: {
      question: string,
      options: string[],
      answer: string
  }[]
  }
}

