import React from 'react'

const CountryInfo = ({data, search}) => {
    const getLanguages = (languages) => {
        console.log(languages)
        return languages
                .map((language, key) =>
                    <li key={key}>
                        {language.name}
                    </li>
                )
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
                        </div>
                    )
    )
}

export default CountryInfo