
import QuestionModal from './components/QuestionModal'
import {useEffect, useState} from 'react'
import axios from 'axios';


interface Question{
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const App = () => {

  const [questions, setQuestions] = useState<Question[]>([]);

  const question: Question = {
    difficulty:"easy", 
    category:"Science: Computers",
    question: "On Twitter, what was the original character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "130", "150"]
};

useEffect(() => {
  axios.get<{results: Question[]}>('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
  .then(result => {
    console.log(result.data.results);
    setQuestions(result.data.results);
    console.log(questions[0].category)
  })
  .catch(err => {
    console.log(err);
  })
},[questions])

  return (
  <div>
    <h1>
      hello
    </h1>
    <QuestionModal question= {questions[0]} />
    
  </div>
  
    //toggle between modals
  // )
)}

export default App
