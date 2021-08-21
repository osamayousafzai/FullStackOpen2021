
const NewEntry = ({newName, onChangeInputName, newNumber, onChangeInputNumber, onClickButtonAdd}) => {
  return(
    <div> 
      <label>Name: </label> <input value={newName} onChange={onChangeInputName} />
        <label>Number: </label> <input value={newNumber} onChange={onChangeInputNumber} />
        <button value="AddButton" onClick={onClickButtonAdd}>Add</button>
    </div>
  );
};

export default NewEntry;