import React, { useState, useEffect } from "react";
import axios from "axios";

import CountryList from './components/CountryList';
import Filter from './components/Filter';

const App = () => {
  
  const [ countryData, setCountryData ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");

  useEffect(()=> {
    const fetchData = async() => {
      const result = await axios("https://restcountries.eu/rest/v2/all");
      setCountryData(result.data);
    }
    fetchData();
  }, [])
  
  const handleSearchTermInputOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleOnClickButtonShow = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <Filter 
        searchTerm={searchTerm} 
        handleSearchTermInputOnChange={handleSearchTermInputOnChange}/>
      
      <CountryList 
        countryData={countryData}
        searchTerm={searchTerm}
        handleOnClickButtonShow={handleOnClickButtonShow}
      />
    </div>
  );
};

export default App;
