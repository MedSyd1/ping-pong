
import styles from "./stick.module.css";

interface Props{
    position : {top:number,left:number};
}


const Stick = ({position}:Props) => {

  return (
    <div
      className={styles["stick"]}
      style={{ top: `${position.top}px`, left: `${position.left}px`}}
    ></div>
  );
};

export default Stick;
