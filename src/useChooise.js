import { useState } from "react"
import { LETTERS, OUTCOMES, VALUES } from './constants'

export default function useChooise() {
    const [active, setActive] = useState("")
    const [userResult, setUserResult] = useState(VALUES['rock'])
    const [cpuResult, setCpuResult] = useState(VALUES['rock'])
    const [resultText, setResultText] = useState("Let´s Play!")
    const [userCount, setUserCount] = useState(0)
    const [cpuCount, setCpuCount] = useState(0)
    const [haveStarted, setHaveStarted] = useState(false)
    // const containerRef = useRef()

    const handleClick = (e) => {
        // Start with the rock image
        setUserResult(VALUES['rock'])
        setCpuResult(VALUES['rock'])
        
        setResultText('Wait...')
    
        // Add active clase to clicked option
        console.log(e.target.dataset.name, active)
        if (e.target.dataset.name !== active) {
          setActive(e.target.dataset.name)
        }
    
        setHaveStarted(true)
    
        setTimeout(() => {
          setHaveStarted(false)
          setUserResult(VALUES[e.target.dataset.name])
    
          const randomNumber = Math.floor(Math.random() * 3)
          const cpuOption = Object.values(VALUES)[randomNumber]
          setCpuResult(cpuOption)
    
          const userSelectionIndex = Object.keys(VALUES).indexOf(e.target.dataset.name)
    
          const userIndex = LETTERS[userSelectionIndex]
          const cpuIndex = LETTERS[randomNumber]
          const outComeValue = OUTCOMES[userIndex + cpuIndex];
    
          // Display the result
          setResultText(e.target.dataset.name === Object.keys(VALUES)[randomNumber] ? "Match Draw" : `${outComeValue} Won!!`)
          if(outComeValue=='User') return setUserCount(prev=>prev+1)
          if(outComeValue=='Cpu') return setCpuCount(prev=>prev+1)
        }, 2000);
      }
    
      const handleRestart = () =>{
        setUserCount(0)
        setCpuCount(0)
      } 


    return {
        active,
        userResult,
        cpuResult,
        resultText,
        userCount,
        cpuCount,
        haveStarted,
        handleClick,
        handleRestart
    }
}
