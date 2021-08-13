import React from "react";

const Filter = ({searchTerm, handleSearchTermInputOnChange}) => {

  return (
    <div>
      <form>
        <div>
          Name: <input value={searchTerm} onChange={handleSearchTermInputOnChange}/>
        </div>
      </form>
    </div>
  );
};

export default Filter;


