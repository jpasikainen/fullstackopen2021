import React from 'react'

const PersonForm = ({newNumber, newName, setNewNumber, setNewName, persons, setPersons}) => {
    const addNumber = (event) => {
        event.preventDefault()
        if (persons.filter(person => person.name === newName).length > 0) {
          alert(`${newName} is already added to phonebook`)
          return
        }
        setPersons([...persons, {"name": newName, "number": newNumber}])
        setNewName('')
        setNewNumber('')
      }
    
    const handleNewName = (event) => {
        setNewName(event.target.value)
      }
    
      const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
      }
    
    return (
        <form onSubmit={addNumber}>
            <div>
            name: <input value={newName} onChange={handleNewName}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={handleNewNumber}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
         </form>
    )
}

export default PersonForm