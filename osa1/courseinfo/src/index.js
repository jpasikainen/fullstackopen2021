import React from 'react'
import ReactDOM from 'react-dom'

import Header from '../src/Header.js'
import Content from '../src/Content.js'
import Total from '../src/Total.js'

const App = () => {
  const course = {
      name: 'Half Stack application development',
      parts: [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
      ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))