

import styles from './ball.module.css'

interface Props{
    position : {top:number,left:number}
}

const Ball = ({position}:Props) => {

  return (
    <div className={styles['ball']} style={{top:position.top,left:position.left}}>  
    </div>
) 
}

export default Ball