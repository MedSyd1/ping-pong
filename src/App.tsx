import Stick from "./components/stick";
import Ball from "./components/ball";
import { useState } from "react";
import styles from './App.module.css'


const randomDigit = () => (Math.ceil(Math.random() * 10) % 2 === 0 ? 1 : -1);



const App = () => { 
  
  const [position1, setPosition1] = useState({ top: 0, left: 5 });
  const [position2, setPosition2] = useState({ top: 0, left: window.innerWidth - 15});
  const [ballPosition, setBallPosition] = useState({ top: window.innerHeight/2, left: window.innerWidth/2 });



  return (
    <div className={styles["container"]}>
      <Stick position={position1}></Stick>
      <Ball position={ballPosition}></Ball>
      <Stick position={position2}></Stick>
    </div>
  )
}

export default App