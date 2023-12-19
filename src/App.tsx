import QuestionModal from "./components/QuestionModal";
import { Question, QuestionList } from "./components/QuestionModal";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from './images/splash_logo.png'

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [started, setStarted] = useState(false);

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
          <div className="container-fluid background">
            <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <img src={logo} alt="logo" className="logo"/>
              </div>
              <div className="col-sm-5"></div>
              <div className="col-sm-2 btn-div">
              {isLoading ? (
          <div className="spinner-border"></div>
        ) : (
          <button type="button" className="btn btn-light start-btn btn-lg" onClick={()=>setStarted(true)}>Start</button>
        )}
                
              </div>
              <div className="col-sm-5"></div>
            </div>
          </div>
          </div>
          
        )

      }
    </>
  );
};

export default App;
