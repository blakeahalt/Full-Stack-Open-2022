import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  let average = (good - bad)/all
  let positive = (good/all)*100

  if (all == 0) {
    return (
      <table>
        No Feedback Given
      </table>
    )
  }
  
  return (
      <table>
        <tbody>
          <StatisticsLine text='good' value={good} />
          <StatisticsLine text='neutral' value={neutral} />
          <StatisticsLine text='bad' value={bad} />
          <StatisticsLine text='all' value={all} /> 
          <StatisticsLine text='average' value={average.toFixed(1)} />
          <StatisticsLine text='all' value={positive.toFixed(1) + "%"} /> 
        </tbody>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setAll(all + 1)
    setGood(good + 1)
  }
  
  const handleNeutralClick = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }
  
  const handleBadClick = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
        <Button handleClick={handleGoodClick} text='Good' />
        <Button handleClick={handleNeutralClick} text='Neutral' />
        <Button handleClick={handleBadClick} text='Bad' />
      <h2>Statistics</h2>
        <Statistics all={all} good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App