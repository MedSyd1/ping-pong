import Stick from "./components/stick";
import Ball from "./components/ball";
import { useEffect, useState } from "react";
import styles from "./App.module.css";

const randomDigit = () => (Math.ceil(Math.random() * 10) % 2 === 0 ? 1 : -1);

const slowDown = (
  ballPosition: { top: number; left: number },
  coordinates: { x: number; y: number },
  position2: { top: number; left: number },
  setPosition2: React.Dispatch<
    React.SetStateAction<{ top: number; left: number }>
  >,
  ballSpeed: number,
  aiSpeed: number
) => {
  if (coordinates.x > 0) {
    let bottom = position2.top + 140;
    if (ballPosition.top >= bottom - 30)
      setPosition2((previous) => ({
        top: previous.top + ballSpeed,
        left: previous.left,
      }));
    else
      setPosition2((previous) => ({
        top: previous.top + aiSpeed,
        left: previous.left,
      }));
  }
  if (coordinates.x < 0) {
    if (ballPosition.top <= position2.top)
      setPosition2((previous) => ({
        top: previous.top - ballSpeed,
        left: previous.left,
      }));
    else
      setPosition2((previous) => ({
        top: previous.top - aiSpeed,
        left: previous.left,
      }));
  }
};

const App = () => {
  const [position1, setPosition1] = useState({ top: 0, left: 5 });
  const [position2, setPosition2] = useState({
    top: window.innerHeight / 2,
    left: window.innerWidth - 15,
  });
  const [ballPosition, setBallPosition] = useState({
    top: window.innerHeight / 2,
    left: window.innerWidth / 2,
  });
  const [coordinates, setCoordinates] = useState({
    x: randomDigit(),
    y: randomDigit(),
  });
  const [ballSpeed, setBallSpeed] = useState(1);
  const [aiSpeed, setAiSpeed] = useState(0.5);
  const [result, setResult] = useState(0);

  useEffect(() => {
    let inter = setInterval(() => {
      setBallPosition((previous) => ({
        top: previous.top + coordinates.x * ballSpeed,
        left: previous.left + coordinates.y * ballSpeed,
      }));
    }, 10);
    return () => clearInterval(inter);
  }, [coordinates]);

  useEffect(() => {
    slowDown(
      ballPosition,
      coordinates,
      position2,
      setPosition2,
      ballSpeed,
      aiSpeed
    );
  }, [ballPosition]);

  useEffect(() => {
    if (ballPosition.top <= 0 || ballPosition.top >= window.innerHeight - 30) {
      setCoordinates((previous) => ({ x: -1 * previous.x, y: previous.y }));
    }
    if (ballPosition.left >= window.innerWidth - 45) {
      setCoordinates((previous) => ({ x: previous.x, y: -1 * previous.y }));
      setBallSpeed(ballSpeed + 1);
    }
    if (
      ballPosition.left <= 15 &&
      ballPosition.top >= position1.top &&
      ballPosition.top - 30 <= position1.top + 140
    ) {
      setCoordinates((previous) => ({ x: previous.x, y: -1 * previous.y }));
      setBallSpeed(ballSpeed + 1);
    }

    if (
      ballPosition.left <= 15 &&
      !(
        ballPosition.top >= position1.top &&
        ballPosition.top - 30 <= position1.top + 140
      )
    ) {
      setCoordinates({ x: randomDigit(), y: randomDigit() });
      setBallPosition({
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
      });
      setPosition2({
        top: window.innerHeight / 2,
        left: window.innerWidth - 15,
      });
      setBallSpeed(1);
      setAiSpeed(0.5);
      setResult(result + 1);
    }
  }, [ballPosition]);

  const handlMouseMove = (e: MouseEvent) => {
    console.log(e.clientY);
    if (e.clientY >= 70 && e.clientY <= window.innerHeight - 70)
      setPosition1((previous) => ({
        top: e.clientY - 70,
        left: previous.left,
      }));
    else if (e.clientY < 70)
      setPosition1((previous) => ({ top: 0, left: previous.left }));
    else if (e.clientY > window.innerHeight - 70)
      setPosition1((previous) => ({
        top: window.innerHeight - 140,
        left: previous.left,
      }));
  };

  useEffect(() => {
    window.addEventListener("mousemove", handlMouseMove);
    return () => window.removeEventListener("mousemove", handlMouseMove);
  }, [ballPosition]);

  return (
    <div className={styles["container"]}>
      <div className={styles["result"]}>
        <div className={styles["player"]}>0</div>
        <div className={styles["separator"]}></div>
        <div className="computer">{result}</div>
      </div>
      <Stick position={position1}></Stick>
      <Ball position={ballPosition}></Ball>
      <Stick position={position2}></Stick>
    </div>
  );
};

export default App;
