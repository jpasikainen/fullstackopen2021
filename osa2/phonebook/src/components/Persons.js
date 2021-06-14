import React from "react";
import restAPI from "./RestAPI";

const Persons = ({ persons, setPersons, filter }) => {
  const deleteNumber = (person) => {
    if (window.confirm(`delete ${person.name} ?`)) {
      restAPI
        .deleteEntry(person)
        .then((res) => console.log(res))
        .catch((error) => alert(error));
      restAPI
        .getAll()
        .then((persons) => setPersons(persons))
        .catch((error) => alert(error));
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
