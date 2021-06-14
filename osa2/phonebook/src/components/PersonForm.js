import React, { useState } from "react";
import restAPI from "./RestAPI";

const PersonForm = ({ persons, setPersons, setNotification }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNumber = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") return;

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.filter((person) => person.name === newName).length > 0) {
      if (window.confirm(`replace ${newName} ?`)) {
        const id = persons.find((person) => person.name === newName).id;
        restAPI
          .update(id, newPerson)
          .catch((error) => setNotification({ message: error, error: true }));
        setNotification({
          message: `Updated ${newName}'s number`,
          error: false,
        });
      }
    } else {
      restAPI
        .create(newPerson)
        .catch((error) => setNotification({ message: error, error: true }));
      setNotification({ message: `Created ${newName}`, error: false });
    }

    setTimeout(() => {
      setNotification({ message: null, error: false });
    }, 5000);

    restAPI
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((error) => setNotification({ message: error, error: true }));

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
