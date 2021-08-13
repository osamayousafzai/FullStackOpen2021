import React from 'react';

import CountryListFiltered from './CountryListFiltered';

const CountryList = ({countryData, searchTerm, handleOnClickButtonShow}) => {

  return (
    <div>
      <h3>Country List</h3>
      <CountryListFiltered 
        countryData={countryData}
        searchTerm={searchTerm}
        handleOnClickButtonShow={handleOnClickButtonShow}
      />
    </div>
  );
};

export default CountryList;