import { useEffect, useState } from "react";

export interface Question{
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionList{
  questions: Question[];
}

const shuffleAnswers = (correct:string, incorrect:string[]):string[]=>{
  let array = [correct, ...incorrect];
  array.sort(() => Math.random() - 0.5); 
  return array;
}

const QuestionModal = ({questions} : QuestionList) => {

  const [questionNum, setQuestionNum] = useState(0)
  const [answers, setAnswers] = useState<string[]>([]);
  const totalQuestions = questions.length;
  const level = questions[0].difficulty;

  useEffect(() => {
    setAnswers(shuffleAnswers(questions[questionNum].correct_answer, questions[questionNum].incorrect_answers));
  }, [questionNum, questions]);

  return (
    <div className="container">
      {/* header */}
      <div className="row">
        <div className="col-sm-12">
          <h4>Question {questionNum}/{totalQuestions}</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <p>Level: {level}</p>
        </div>
        <div className="col-sm-12">
          <h1>{questions[questionNum].question}</h1>
        </div>
        {
          answers.map((answer)=>
          <button type="button" className="btn btn-outline-secondary">{answer}</button>)
        }
      </div>

    </div>


    // <div>
    //   <div
    //     className="modal fade"
    //     id="exampleModalToggle"
    //     aria-hidden="true"
    //     aria-labelledby="exampleModalToggleLabel"
    //     tabIndex={-1}
    //   >
    //     <div className="modal-dialog modal-dialog-centered">
    //       <div className="modal-content">
    //         <div className="modal-header">
    //           <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
    //             {questions[0].question}
    //           </h1>
    //           <button
    //             type="button"
    //             className="btn-close"
    //             data-bs-dismiss="modal"
    //             aria-label="Close"
    //           ></button>
    //         </div>
    //         <div className="modal-body">
    //           Show a second modal and hide this one with the button below.
    //         </div>
    //         <div className="modal-footer">
    //           <button
    //             className="btn btn-primary"
    //             data-bs-target="#exampleModalToggle2"
    //             data-bs-toggle="modal"
    //           >
    //             Open second modal
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <button
    //     className="btn btn-primary"
    //     data-bs-target="#exampleModalToggle"
    //     data-bs-toggle="modal"
    //   >
    //     Open first modal
    //   </button>
    // </div>
  );
};

export default QuestionModal;
