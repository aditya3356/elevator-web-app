import { useState, useRef, useEffect } from "react";
import "./App.css";
import { DownButton, UpButton } from "./buttons";

function App() {
  const transformHalf = "transform-half";
  const translateUpMiddle = "translate-up-middle";
  const translateUpTop = "translate-up-top";
  const translateDownMiddle = "translate-down-middle";
  const translateDownBottom = "translate-down-bottom";

  const [elevatorClass, setElevatorClass] = useState("");
  const [upSelectedLevel0, setUpSelectedLevel0] = useState(false);
  const [upSelectedLevel1, setUpSelectedLevel1] = useState(false);
  const [downSelectedLevel1, setDownSelectedLevel1] = useState(false);
  const [downSelectedLevel2, setDownSelectedLevel2] = useState(false);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const upSelectedLevel1Ref = useRef(upSelectedLevel1);
  const downSelectedLevel1Ref = useRef(downSelectedLevel1);

  useEffect(() => {
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [timeoutIds]);

  const upClickedLevel0 = () => {
    if (upSelectedLevel0) {
      return;
    }

    setUpSelectedLevel0(true);
    setElevatorClass(`${transformHalf} ${translateUpMiddle}`);
    const timeoutId = setTimeout(() => {
      if (!upSelectedLevel1Ref.current) {
        setElevatorClass(`${transformHalf} ${translateUpTop}`);
      }
      setUpSelectedLevel0(false);
      setUpSelectedLevel1(false);
      upSelectedLevel1Ref.current = false;
    }, 5000);
    setTimeoutIds([...timeoutIds, timeoutId]);
  };

  const upClickedLevel1 = () => {
    if (upSelectedLevel1) {
      return;
    }

    setUpSelectedLevel1(true);
    upSelectedLevel1Ref.current = true;
  };

  const downClickedLevel1 = () => {
    if (downSelectedLevel1) {
      return;
    }

    setDownSelectedLevel1(true);
    downSelectedLevel1Ref.current = true;
  };

  const downClickedLevel2 = () => {
    if (downSelectedLevel2) {
      return;
    }

    setDownSelectedLevel2(true);
    setElevatorClass(`${transformHalf} ${translateDownMiddle}`);
    const timeoutId = setTimeout(() => {
      if (!downSelectedLevel1Ref.current) {
        setElevatorClass(`${transformHalf} ${translateDownBottom}`);
      }
      setDownSelectedLevel2(false);
      setDownSelectedLevel1(false);
      downSelectedLevel1Ref.current = false;
    }, 5000);
    setTimeoutIds([...timeoutIds, timeoutId]);
  };

  return (
    <div className="App w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex items-center">
        <div>
          L-2
          <div
            className={`h-fit cursor-pointer ${
              downSelectedLevel2 ? "bg-green-600" : ""
            }`}
            onClick={downClickedLevel2}
          >
            {DownButton}
          </div>
        </div>
        <div className="box-border w-40 h-40 ml-10 p-2 border border-black" />
      </div>
      <div className="flex">
        <div className="flex flex-col justify-around">
          <div
            className={`h-fit cursor-pointer ${
              upSelectedLevel1 ? "bg-green-600" : ""
            }`}
            onClick={upClickedLevel1}
          >
            {UpButton}
          </div>
          <div>L-1</div>
          <div
            className={`h-fit cursor-pointer ${
              downSelectedLevel1 ? "bg-green-600" : ""
            }`}
            onClick={downClickedLevel1}
          >
            {DownButton}
          </div>
        </div>
        <div className="box-border w-40 h-40 ml-10 p-2 border border-black" />
      </div>
      <div className="flex items-center">
        <div>
          L-0
          <div
            className={`h-fit cursor-pointer ${
              upSelectedLevel0 ? "bg-green-600" : ""
            }`}
            onClick={upClickedLevel0}
          >
            {UpButton}
          </div>
        </div>
        <div className="box-border w-40 h-40 ml-10 p-2 border border-black">
          <div className={`h-full bg-current ${elevatorClass}`} />
        </div>
      </div>
    </div>
  );
}

export default App;
