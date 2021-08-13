import axios from "axios";
import React, { useState, useEffect } from "react";

const Weather = ({capital}) => {

  const [ weatherData, setWeatherData ] = useState([]);

  const apiWeather = process.env.REACT_APP_API_KEY;
  const urlWeather = `http://api.weatherstack.com/current?access_key=${apiWeather}&query=${capital}`

  useEffect( () => {
    const fetchData = async () => {
      const result = await axios.get(urlWeather)
      setWeatherData(result.data);
    };
    fetchData();
  }, [urlWeather]);

  try {
    if (weatherData.current.temperature !== undefined) {
      return (
        <div>
          <h4>Weather in {capital}</h4>
          Temperature : {weatherData.current.temperature} &#8451;
          <br />
          <img src={weatherData.current.weather_icons[0]} alt="weather icon" />
          <br />
          Wind: {weatherData.current.wind_speed} kph direction{" "}
          {weatherData.current.wind_dir} direction
        </div>
      );
    }
  } catch (err) {
    return "Waiting for data to arrive......";
  }
};

export default Weather;