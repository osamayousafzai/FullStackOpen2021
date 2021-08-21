const Filter = ({searchTerm, onChangeInputFilter}) => {
  return (
    <div>
        <label>Filter Phonebook Entries : </label> <input value={searchTerm} onChange={onChangeInputFilter}/>
    </div>
  )
};

export default Filter;