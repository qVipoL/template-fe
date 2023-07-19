export const Texts = {
  login: {
    loginToTheSystem: "כניסה למערכת",
    email: "אימייל",
    password: "סיסמה",
    login: "כניסה",
    register: "הירשם",
    errorOccured: "איראה שגיאה, פרטים שגויים",
  },
  register: {
    registerToTheSystem: "הירשם למערכת",
    email: "אימייל",
    phone: "טלפון",
    password: "סיסמה",
    login: "כניסה",
    name: "שם מלא",
    register: "הירשם",
    errorOccured: "איראה שגיאה, משתמש אם מייל או טלפון כזה כבר קיים במערכת",
    success: "המשתמש נוצר בהצלחה",
  },
  general: {
    home: "מסך בית",
    allQuestions: "כל השאלות",
    wrongQuestions: "שאלות שטעיתי",
    mySaved: "השמורים שלי",
    pastExams: "מבחני עבר",
    statistics: "סטטיסטיקות",
    randomizeQuestion: "הגרל שאלה",
    logout: "התנתקות",
    search: "חיפוש",
    prepareForNearExam: "התכונן למבחן הקרוב!",
    seconds: "שניות",
    minutes: "דקות",
    hours: "שעות",
    days: "ימים",
    solvedCorrectRecently: "פתרת נכון לאחרונה:",
    studiedUntilNow: "למדת עד כה:",
    questions: "שאלות!",
    noQuestionsWereAnswered: "תרם ענית על שאלות",
    fromContent: "מהחומר הלימודי!",
    lawOfLaws: "חוק החוזים",
    youDidGreatOnThisTopic: "הצלחת בנושא הזה לאחרונה!",
    questionsSolved: "שאלות שענית",
    twoWeeks: "שבועיים",
    month: "חודש",
    questionsRemaining: "שאלות שנותרו",
    totalQuestions: (num: number) => `סה״כ בחבילה: ${num} שאלות`,
    logoutQuestion: "עבודה טובה, קח הפסקה ותטען מחדש!",
    disconnect: "התנתק",
    preferToStay: "מעדיף להישאר",
    dataLoading: "המידע נטען...",
  },
  home: {
    welcome: (name: string) => `שלום ${name} 👋🏻`,
    niceToSee: "כיף לראות אותך שוב!",
  },
  errors: {
    fieldRequired: "שדה זה הוא חובה",
    emailIsInvalid: "אימייל זה הוא לא תקין",
    minChars: (num: number) => `לא פחות מ ${num}  תווים`,
    maxChars: (num: number) => `לכל היותר ${num} תווים`,
  },
};