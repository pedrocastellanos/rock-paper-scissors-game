import './App.css'
import { useState, useRef } from 'react'
import { LETTERS, OUTCOMES, VALUES } from './constants'
import { Img } from './components/Img'

function App() {
  const [active, setActive] = useState("")
  const [userResult, setUserResult] = useState(VALUES['rock'])
  const [cpuResult, setCpuResult] = useState(VALUES['rock'])
  const [resultText, setResultText] = useState("Let´s Play!")
  const [userCount, setUserCount] = useState(0)
  const [cpuCount, setCpuCount] = useState(0)

  const containerRef = useRef()

  const handleClick = (e) => {
    // Start with the rock image
    setUserResult(VALUES['rock'])
    setCpuResult(VALUES['rock'])

    setResultText('Wait...')

    // Add active clase to clicked option
    if (e.target.dataset.name !== active) {
      setActive(e.target.dataset.name)
    }

    containerRef.current.classList.add('start')

    setTimeout(() => {
      containerRef.current.classList.remove('start')
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
      if (outComeValue == 'User') return setUserCount(prev => prev + 1)
      if (outComeValue == 'Cpu') return setCpuCount(prev => prev + 1)
    }, 2000);
  }

  const handleRestart = () => {
    setUserCount(0)
    setCpuCount(0)
  }

  return (
    <section className="container" ref={containerRef}>
      <div className="result_field">
        <div className="result_images">
          <span className="user_result">
            <img src={userResult} alt="Rock" />
          </span>
          <span className="cpu_result">
            <img src={cpuResult} alt="Rock" />
          </span>
        </div>
        <div className="result">{resultText}</div>
      </div>
      <div className="option_images">
        <Img active={active} handleClick={handleClick} option="rock" />
        <Img active={active} handleClick={handleClick} option="paper" />
        <Img active={active} handleClick={handleClick} option="scissors" />
      </div>
      <div className="count">
        <div className="user-count">User: {userCount}</div>
        <div className="restart" onClick={handleRestart}>Restart</div>
        <div className="cpu-count">CPU: {cpuCount}</div>
      </div>
    </section>
  )
}

export default App
