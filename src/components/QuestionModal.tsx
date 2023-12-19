import { useEffect, useRef, useState } from "react";
import EndPage from "./EndPage";
import logo from "../images/logo.png";

export interface Question {
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionList {
  questions: Question[];
}

const shuffleAnswers = (correct: string, incorrect: string[]): string[] => {
  let array = [correct, ...incorrect];
  array.sort(() => Math.random() - 0.5);
  return array;
};

const QuestionModal = ({ questions }: QuestionList) => {
  const [questionNum, setQuestionNum] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const totalQuestions = questions.length;
  const level = questions[0].difficulty;

  useEffect(() => {
    setAnswers(
      shuffleAnswers(
        questions[questionNum].correct_answer,
        questions[questionNum].incorrect_answers
      )
    );
  }, [questionNum, questions]);

  const nextQuestion = (answer: string) => {
    if (questionNum + 1 === totalQuestions) {
      setGameEnded(true);
      setQuestionNum(0);
    } else {
      if (answer === questions[questionNum].correct_answer) {
        setRightAnswers(rightAnswers + 1);
      }
      setQuestionNum(questionNum + 1);
    }
  };

  //timer
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:10");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + totalQuestions * 5);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <>
      {timer === "00:00" ? (
        <EndPage
          right={rightAnswers}
          total={totalQuestions}
          questions={questions}
        />
      ) : (
        <>
          {!gameEnded ? (
            <>
              <div className="container-fluid header">
                <div className="row">
                  <div className="col-sm-12 header-content">
                    <h4>
                      Question {questionNum + 1}/{totalQuestions}
                    </h4>
                    <img src={logo} alt="logo" className="tiny-logo" />
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <p>
                      Level: <span className={level}>{level}</span>
                    </p>
                  </div>
                  <div className="col-sm-12">
                    <h1>{questions[questionNum].question}</h1>
                  </div>
                  {answers.map((answer) => (
                    <div key={answer} className="col-sm-12">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg answer"
                        onClick={() => {
                          nextQuestion(answer);
                        }}
                      >
                        {answer}
                      </button>
                    </div>
                  ))}
                  <div className="row timer-row">
                    <div className="col-sm-12 timer">
                      <h2>{timer}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EndPage
              right={rightAnswers}
              total={totalQuestions}
              questions={questions}
            />
          )}
        </>
      )}
    </>
  );
};

export default QuestionModal;
