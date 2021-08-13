import React from "react";
import Country from "./Country";

const CountryListFiltered = ({countryData, searchTerm, handleOnClickButtonShow}) => {

  const filteredCountryData = countryData.filter( country => country.name.includes(searchTerm))
  const listCount = filteredCountryData.length;

  if (searchTerm === ""){
    return (
      <div><p>Use Filter</p></div>
    )
  } else if (listCount > 10) {
    return (
      <div><p>List is too Long</p></div>
    )
  } else if (listCount === 1) {
      return <Country countryData={filteredCountryData}/>
  } else { 
    return (
      <div>
        {filteredCountryData.map( country => 
          <li key={country.alpha3Code}>
            {country.name} 
            <button value={country.name} onClick={handleOnClickButtonShow}>Show</button>
          </li>
        )}
      </div>
    );
  }
};

export default CountryListFiltered;