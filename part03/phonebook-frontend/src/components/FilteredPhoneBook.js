import React from 'react';

const FilteredPhoneBook = ({persons, searchTerm, onClickButtonDelete}) => {
  
  const filteredPersons = persons.filter(person => person.name.includes(searchTerm));

  return (
    <div>
      {filteredPersons.map( person => <li key={person.id}>{person.name} - {person.number} - <button value={person.id} onClick={onClickButtonDelete}>Delete</button></li>)}
    </div>
  );
};

export default FilteredPhoneBook; 
