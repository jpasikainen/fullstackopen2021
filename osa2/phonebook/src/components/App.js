import React, { useState, useEffect } from "react";
import restAPI from "./RestAPI";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    restAPI
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((error) => alert(error));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new number</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
