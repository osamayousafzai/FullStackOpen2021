
const NewEntry = ({newName, onChangeInputName, newNumber, onChangeInputNumber, onClickButtonAdd}) => {
  return(
    <div>
      <form>
        <div>
          Name: <input value={newName} onChange={onChangeInputName}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={onChangeInputNumber}/>
        </div>
        <div>
          <button type="submit" value="AddButton" onClick={onClickButtonAdd}>Add</button>
        </div>
      </form>
    </div>
  );
};

export default NewEntry;