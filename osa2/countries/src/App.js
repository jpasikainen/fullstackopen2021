import React, {useState, useEffect} from 'react';
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])

  const handleSearch = (event) => setSearch(event.target.value.toLowerCase())

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setData(response.data)
      })
  }, [])

  return(
      <div>
        <div>find countries <input value={search} onChange={handleSearch} /></div>
        <Countries data={data} search={search} setSearch={setSearch}/>
      </div>
    )
}

export default App;