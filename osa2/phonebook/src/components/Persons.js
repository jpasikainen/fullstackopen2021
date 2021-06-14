import React from "react";
import restAPI from "./RestAPI";

const Persons = ({ persons, setPersons, filter, setNotification }) => {
  const deleteNumber = (person) => {
    if (window.confirm(`delete ${person.name} ?`)) {
      setNotification({ message: `Deleted ${person.name}`, error: false });
      setTimeout(() => {
        setNotification({ message: null, error: false });
      }, 5000);

      restAPI
        .deleteEntry(person)
        .then((res) => console.log(res))
        .catch((error) => setNotification({ message: error, error: true }));
      restAPI
        .getAll()
        .then((persons) => setPersons(persons))
        .catch((error) => setNotification({ message: error, error: true }));
    }
  };

  const displayPersons = () => {
    return persons
      .filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map((person, key) => (
        <div key={key}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={() => deleteNumber(person)}>delete</button>
        </div>
      ));
  };

  return <div>{displayPersons()}</div>;
};

export default Persons;
