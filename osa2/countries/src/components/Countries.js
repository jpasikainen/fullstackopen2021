import React, {useState} from 'react'

import CountryInfo from './CountryInfo'

const Countries = ({data, search}) => {
    const [name, newName] = useState('')

    const handleButtonClick = (event) => {
        console.log(event.target.value)
        newName(event.target.value.toLowerCase())
    }

    const infos = () => {
        console.log(name === '')
        if (name === '') {
            return <div></div>
        }
        else {
            return (
                <CountryInfo data={data} search={name} />
            )
        }
    }

    const response = () => {
        const countriesFound = data.filter(country => country.name.toLowerCase().includes(search)).length

        if (countriesFound === 1) {
            console.log('Only one country was found')
            return (
                <CountryInfo data={data} search={search} />
            )
        }
        else if (countriesFound > 10) {
            console.log('Too many matches!')
            return (
                <p>Too many matches, specify another filter</p>
            )
        }

        return (
            <div>
                {data.filter(country => country.name.toLowerCase().includes(search))
                    .map((country, key) => 
                        <div key={key}>
                            <p>{country.name}</p>
                            <button onClick={handleButtonClick} value={country.name}>show</button>
                        </div>
                    )}
                
                {infos()}
            </div>
        )
    }

    return (
        <div>
            {response()}
        </div>
    )
}

export default Countries