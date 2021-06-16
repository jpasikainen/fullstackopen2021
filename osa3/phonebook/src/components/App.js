import React, { useState, useEffect } from "react";
import restAPI from "./RestAPI";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    error: false,
  });

  useEffect(() => {
    restAPI
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((error) =>
        setNotification({ ...notification, message: error, error: true })
      );
  }, []);

  return (
    <div>
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new number</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={filter}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
