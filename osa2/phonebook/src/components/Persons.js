import React from 'react'

const Persons = ({filter, persons}) => {
    const displayPersons = () => {
        if (filter === '') {
          return persons.map((person, key) => <p key={key}>{person.name} {person.number}</p>)
        }
        else {
          return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map((person, key) => <p key={key}>{person.name} {person.number}</p>)
        }
      }

    return (
        <div>
            {displayPersons()}
        </div>
    )
}

export default Persons