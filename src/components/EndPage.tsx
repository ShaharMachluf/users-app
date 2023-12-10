import { useState } from "react";
import QuestionModal from "./QuestionModal";

const EndPage = (props: any) => {
  const [started, setStarted] = useState(false);

  return started ? (
    <QuestionModal questions={props.questions} />
  ) : (
    <div className="row">
      <div className="col-sm-12">
        <h1>Game Over</h1>
      </div>
      <div className="col-sm-12">
        <h3>
          you answered {(props.right / props.total) * 100}% of the questions
          correctly
        </h3>
      </div>
      <div className="col-sm-12">
        <button
          type="button"
          className="btn btn-info"
          onClick={() => setStarted(true)}
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default EndPage;
