import React, { useState } from "react";
import restAPI from "./RestAPI";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNumber = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.filter((person) => person.name === newName).length > 0) {
      if (window.confirm(`replace ${newName} ?`)) {
        const id = persons.find((person) => person.name === newName).id;
        restAPI.update(id, newPerson).catch((error) => alert(error));
      }
    } else {
      restAPI.create(newPerson).catch((error) => alert(error));
    }

    restAPI
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((error) => alert(error));

    setNewName("");
    setNewNumber("");
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
