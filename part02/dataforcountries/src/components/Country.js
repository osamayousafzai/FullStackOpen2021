import React from "react";
import Weather from "./Weather";
const Country = ({countryData}) => {

const { name, capital, population, languages, flag } = countryData[0];

  return (
    <div>
      <h4>Name: {name}</h4>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h4>Languages:</h4>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img
        src={flag}
        alt="flag"
        height="100"
        width="200"
      />
      <Weather capital={capital}/>
    </div>
  );
};

export default Country;