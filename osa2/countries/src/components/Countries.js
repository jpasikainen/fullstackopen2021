import React from 'react'

const Countries = ({data, search}) => {
    const response = () => {
        const countriesFound = data.filter(country => country.name.toLowerCase().includes(search)).length
        const getLanguages = (languages) => {
            console.log(languages)
            return languages
                    .map((language, key) =>
                        <li key={key}>
                            {language.name}
                        </li>
                    )
        }

        if (countriesFound === 1) {
            console.log('Only one country was found')
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
        else if (countriesFound > 10) {
            console.log('Too many matches!')
            return (
                <p>Too many matches, specify another filter</p>
            )
        }

        return (
            data.filter(country => country.name.toLowerCase().includes(search)).map((country, key) => <p key={key} >{country.name}</p>)
        )
    }

    return (
        <div>
            {response()}
        </div>
    )
}

export default Countries