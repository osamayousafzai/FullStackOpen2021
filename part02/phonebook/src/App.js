import React, { useState, useEffect } from 'react';
import { getPhonebook, createEntry, deleteEntry, updateEntry } from './services/phonebookService';

import FilteredPhoneBook from './components/FilteredPhoneBook';
import NewEntry from './components/NewEntry';
import Notification from './components/Notification';

const App = () => {

  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ notification, setNotification ] = useState(null);

  useEffect(() => {
    // get data from server
    const fetchData = async () => {
      const result = await getPhonebook();
      // render information
      setPersons(result.data);
    }
    fetchData();
  },[]);

  // check if name already exists in phonebook
  const checkIfNameExists = (name) => {
    const result  = persons.some(person => person.name === name);
    return result;
  }
  
  // clear all forms
  const clearForm = () => {
    setNewName("");
    setNewNumber(""); 
  };

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
        const result = await createEntry(newPhonebookEntryObject);
        // update persons with information and render
        setPersons([...persons, result.data]);
      }
      postData();
      // create notification
      createNotification("addEntry", `Added ${newName}`)
      // clear form
      clearForm();
  };

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
        const result = await updateEntry(updatedObject)
        // update persons array
        setPersons(persons.map(person => {
          if(person.id === result.id){
            return result;
          };
          return person;
        }));
    } catch (e) {
      // if person has already been deleted, display error message
      createNotification("error", `Information for ${existingObject.name} has already been removed from server`);
    }
  };
    editData();

    // create notification
    createNotification("editEntry",`Edited ${newName}`);
    // clear form
    clearForm();

    // Re-render phonebook with updated information
    setPersons(
      persons.filter(person => person.id !== existingObject.id)
    )
    
  };

  const deletePhonebookEntry = (id, name) => {
    // send delete request to server
    const deleteData = async () => {
      const result = await deleteEntry(id);
      return result;
    }
    deleteData();
    // Re-render phonebook with updated information
    setPersons(persons.filter((person) => person.id !== id))
    // create notification
    createNotification("deleteEntry", `Deleted ${name}`);
  };

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
    const id = Number(e.target.value);
    const  {name} = persons.find(person => person.id === id);
    if(window.confirm(`Delete ${name}`)) {
      // deletion confirmed. detele entry
      deletePhonebookEntry(id, name);
    }
  };

  return (
    <div>
      <Notification notification={notification}/>
    
      <h2>Filter</h2>
      Filter: <input value={searchTerm} onChange={onChangeInputFilter}/>
      
      <h2>Phonebook</h2>
      <NewEntry 
        newName={newName} 
        newNumber={newNumber} 
        onChangeInputName={onChangeInputName}
        onChangeInputNumber={onChangeInputNumber}
        onClickButtonAdd={onClickButtonAdd}
      />
      
      <h2>Numbers</h2>
      <FilteredPhoneBook 
        persons={persons} 
        searchTerm={searchTerm}
        onClickButtonDelete={onClickButtonDelete} 
      />
    </div>
  );
}

export default App;