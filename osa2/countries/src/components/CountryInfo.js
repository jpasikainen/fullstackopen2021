import React, { useState } from "react";
import Axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const CountryInfo = ({ data, search }) => {
  const [temp, setTemp] = useState(0);
  const [iconURL, setIconURL] = useState("");
  const [wind, setWind] = useState(0);

  const getLanguages = (languages) => {
    console.log(languages);
    return languages.map((language, key) => <li key={key}>{language.name}</li>);
  };

  const getWeather = (location) => {
    console.log(location);
    Axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&aqi=no`
    )
      .then((response) => {
        console.log(response.data.current.temp_c);
        setTemp(response.data.current.temp_c);
        console.log(response.data.current.wind_kph);
        setWind(response.data.current.wind_kph);
        setIconURL(response.data.current.condition.icon);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return data
    .filter((country) => country.name.toLowerCase().includes(search))
    .map((country, key) => (
      <div key={key}>
        <h1>{country.name}</h1>
        <p>{country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>{getLanguages(country["languages"])}</ul>
        <img src={country.flag} alt="flag" style={{ width: 200 }} />
        <h2>Weather in {country.capital}</h2>
        {getWeather(country.capital)}
        <p>temperature: {temp} Celsius</p>
        <img src={`https:${iconURL}`} />
        <p>wind: {wind} kph</p>
        <a href="https://www.weatherapi.com/docs/" title="Weather API">
          weatherapi.com
        </a>
      </div>
    ));
};

export default CountryInfo;
