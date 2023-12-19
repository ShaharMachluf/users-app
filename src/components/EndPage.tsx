import { useState } from "react";
import QuestionModal from "./QuestionModal";
import logo from "../images/logo.png";
import successCharacter from "../images/success_character.png";
import failCharacter from "../images/failed_character.png";

const EndPage = (props: any) => {
  const [started, setStarted] = useState(false);

  const successRate= (right:number, total:number) => {
    return (right / total) * 100;
  }

  const rate = successRate(props.right, props.total); 

  return started ? (
    <QuestionModal questions={props.questions} />
  ) : (
    <div>
      <div>
    {
      
      rate >= 80 ?
      (
        <>
          <div className="container-fluid header-success">
          <div className="row">
            <div className="col-sm-12 header-content">
            <button
          type="button"
          className="btn btn-light"
          onClick={() => setStarted(true)}
        >
          Start Over
        </button>
              <img src={logo} alt="logo" className="tiny-logo"/>
            </div>
          </div>
        </div>
        <div className="container">
          
          <div className="row">
            <div className="col-sm-12">
              <h1 className="title success">GREAT JOB</h1>
            </div>
            <div className="col-sm-12">
              <p className="end-text">You answered {rate}% of the questions correctly</p>
            </div>
            <div className="col-sm-12">
              <img src={successCharacter} alt="success character" className="logo"/>
            </div>
          </div>
        </div>
        </>
      ) :
      (
        <>
          <div className="container-fluid header-fail">
          <div className="row">
            <div className="col-sm-12 header-content">
            <button
          type="button"
          className="btn btn-light"
          onClick={() => setStarted(true)}
        >
          Start Over
        </button>
              <img src={logo} alt="logo" className="tiny-logo"/>
            </div>
          </div>
        </div>

        <div className="container">
          
          <div className="row">
            <div className="col-sm-12">
              <h1 className="title fail">FAILED</h1>
            </div>
            <div className="col-sm-12">
              <p className="end-text">You answered {rate}% of the questions correctly</p>
            </div>
            <div className="col-sm-12">
              <img src={failCharacter} alt="fail character" className="logo" />
            </div>
          </div>
        </div>
        </>
      )

    }
      </div>
    </div>
  );
};

export default EndPage;
