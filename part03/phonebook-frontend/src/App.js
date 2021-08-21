import React, { useState, useEffect } from 'react';
import { getPhonebook, createEntry, deleteEntry, updateEntry } from './services/phonebookService';

import FilteredPhoneBook from './components/FilteredPhoneBook';
import NewEntry from './components/NewEntry';
import Notification from './components/Notification';
import Filter from './components/Filter'


const App = () => {

  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ notification, setNotification ] = useState(null);

  useEffect(() => {
    // get data from server
    const fetchData = async () => {
      const result = await getPhonebook();
      // render information
      setPersons(result.data)
    }
    fetchData();
  },[]);

  // clear all formsobject
  const clearForm = () => {
    setNewName("");
    setNewNumber(""); 
  };

  // check if name already exists in phonebook
  const checkIfNameExists = (name) => {
    const result  = persons.some(person => person.name === name);
    return result;
  }
  
  // create notifications
  const createNotification = (type, message) => {
    setNotification({
      ...notification, 
      type: type, 
      message:message
    });

    // remove notification after 5 sec.
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // create new entry
  const createNewPhonebookEntry = () => {
    const newPhonebookEntryObject = {
      name: newName,
      number: newNumber
    };

    // send post request to server
    const postData = async () => {
      try {
        const result = await createEntry(newPhonebookEntryObject)
        setPersons([...persons, result.data])
        // create notification
        createNotification("addEntry", `Added ${newName}`)
        // clear form
        clearForm();
        return result;
      } catch (e) {
        createNotification("error", `${e.response.data.error}`)
      }
    }
    postData();
  };

  // edit entry
  const editPhonebookEntry = () => {
    // created existing person object
    const existingObject = persons.find(person => person.name === newName);
    // updated the existing person object with new information
    const updatedObject = ({
      ...existingObject,
      number: newNumber
    });
    // send put request to server
    const editData = async () => {
      try {
        const result = await updateEntry(updatedObject);
        if (result.data != null) {
          // Re-render phonebook with updated information
          setPersons(persons.filter(person => person.id !== existingObject.id))
          // create notification
          createNotification("editEntry",`Edited ${newName}`);
          // clear form
          clearForm();
          return result;
        } else {
          createNotification("error", `Information for ${existingObject.name} has already been removed from server`);
        }
      } catch (e) {
        console.log(e)
      }
    };
    editData();
  };

  // delete entry
  const deletePhonebookEntry = (id, name) => {
    // send delete request to server
    const deleteData = async () => {
      try {
        const result = await deleteEntry(id);
        // Re-render phonebook with updated information
        setPersons(persons.filter((person) => person.id !== id))
        // create notification
        createNotification("deleteEntry", `Deleted ${name}`);
        return result;        
      } catch (e) {
        createNotification("error", `${e.response.data.error}`)
      }
    }
    deleteData();
  };

  //////////////////// event handlers
  const onChangeInputName = (e) => {
    const name = e.target.value;
    setNewName(name);
  }

  const onChangeInputNumber = (e) => {
    const number = e.target.value;
    setNewNumber(number);
  }

  const onChangeInputFilter = (e) => {
    const filterInput = e.target.value;
    setSearchTerm(filterInput);
  }

  const onClickButtonAdd = (e) => {
    e.preventDefault();
    if(checkIfNameExists(newName)) {
      // name already exisits
      if (window.confirm(`${newName} already added to phonebook, replace the old number with a new one?`)) {
        // if update confirmed. updated person with new information
        editPhonebookEntry();
      }
    } else {
      // name doesnt exist. create new.
      createNewPhonebookEntry();
    };
    // clear form
    clearForm();
  };

  const onClickButtonDelete = (e) => {
    const id = e.target.value;
    const personToDelete = persons.find(person => person.id === id);
    if(window.confirm(`Delete ${personToDelete.name}`)) {
      // deletion confirmed. detele entry
      deletePhonebookEntry(personToDelete.id, personToDelete.name);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <br/>
      <NewEntry 
        newName={newName} 
        newNumber={newNumber} 
        onChangeInputName={onChangeInputName}
        onChangeInputNumber={onChangeInputNumber}
        onClickButtonAdd={onClickButtonAdd}
      />
      <br/>
      <Filter searchTerm={searchTerm} onChangeInputFilter={onChangeInputFilter}/>
      <br/>
      <h2>Phonebook Entries</h2>
      {<FilteredPhoneBook 
        persons={persons} 
        searchTerm={searchTerm}
        onClickButtonDelete={onClickButtonDelete} 
      />}
    </div>
  );
}

export default App;