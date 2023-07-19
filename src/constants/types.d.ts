export interface User {
  _id: string;
  name: string;
  role: string;
  createdAt: Date;
  email: string;
  lastPurchasedQuestionAmount: number;
  questionsLeft: number;
  favoriteQuestions: any[];
  solvedQuestions: any[];
  __v: number;
  solvedExams: SolvedExam[];
  userSettings: any;
  configWasInitialized: boolean;
}
