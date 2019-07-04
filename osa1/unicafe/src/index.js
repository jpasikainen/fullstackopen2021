import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, name}) => (<button onClick={onClick}>{name}</button>)

const Statistic = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({good, bad, neutral, all}) => {
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={(good - bad) / all} />
      <Statistic text="average" value={good / all * 100} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} name="good" />
      <Button onClick={() => setNeutral(neutral + 1)} name="neutral" />
      <Button onClick={() => setBad(bad + 1)} name="bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)