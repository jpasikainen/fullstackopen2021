import React from 'react'
import Part from '../components/Part'

const Content = (props) => {
    const Parts = () => props.parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises}/>)

    return (
        <div>
            {Parts()}
        </div>
    )
}

export default Content