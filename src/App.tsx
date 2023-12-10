import QuestionModal from "./components/QuestionModal";
import { Question, QuestionList } from "./components/QuestionModal";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [started, setStarted] = useState(false);

  //   const question: Question = {
  //     difficulty:"easy",
  //     category:"Science: Computers",
  //     question: "On Twitter, what was the original character limit for a Tweet?",
  //     correct_answer: "140",
  //     incorrect_answers: ["120", "130", "150"]
  // };

  useEffect(() => {
    axios
      .get<{ results: Question[] }>(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
      )
      .then((result) => {
        console.log(result.data.results);
        setQuestions(result.data.results);
        console.log(questions[0].category);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [questions]);

  return (
    <>
      {
        started ? (
          <QuestionModal questions={questions} />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1>TRIVIA TIME</h1>
              </div>
              <div className="col-sm-12">
              {isLoading ? (
          <div className="spinner-border"></div>
        ) : (
          <button type="button" className="btn btn-info" onClick={()=>setStarted(true)}>Start</button>
        )}
                
              </div>
            </div>
          </div>
        )

      }
      {/* <div>
        {isLoading ? (
          <div className="spinner-border"></div>
        ) : (
          
        )}
      </div> */}
    </>

    //toggle between modals
    // )
  );
};

export default App;
