import React, {useState} from 'react'
import Axios from 'axios'

const CountryInfo = ({data, search}) => {
    
    const [temp, setTemp] = useState(0)
    const [wind, setWind] = useState(0)

    const getLanguages = (languages) => {
        console.log(languages)
        return languages
                .map((language, key) =>
                    <li key={key}>
                        {language.name}
                    </li>
                )
    }

    const getWeather = (location) => {
        console.log(location)
        Axios
          .get(`http://api.apixu.com/v1/current.json?key=   &q=${location}`)
          .then(response => {
            console.log(response.data.current.temp_c)
            setTemp(response.data.current.temp_c)
            console.log(response.data.current.wind_kph)
            setWind(response.data.current.wind_kph)
          })
      }

    return (
        data.filter(country => country.name.toLowerCase().includes(search))
                    .map((country, key) =>
                        <div key={key}>
                            <h1>{country.name}</h1>
                            <p>{country.capital}</p>
                            <p>population {country.population}</p>
                            <h2>languages</h2>
                            <ul>
                                {getLanguages(country["languages"])}
                            </ul>
                            <img src={country.flag} alt="flag" style={{width: 200}}/>
                            <h2>Weather in {country.capital}</h2>
                            {getWeather(country.capital)}
                            <p>temperature: {temp} Celsius</p>
                            <p>wind: {wind} kph</p>
                            <a href="https://www.apixu.com/" title="Weather API">Apixu.com</a>
                        </div>
                    )
    )
}

export default CountryInfo