import { NextPage } from 'next'
import { useState, useEffect } from 'react'

import Layout from '../components/layout'
import useApiData from '../hooks/use-api-data'
import Airport from '../types/airport'

const Page: NextPage = () => {
  const airports = useApiData<Airport[]>('/api/airports', [])
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])
  const [validation, setValidation] = useState('')

  const changeFilter = e => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    let check = filter.toLowerCase()

    if (filter.length > 1) {
      setValidation('')
      setFiltered(airports.filter(airport => {
        let result = airport.name.toLowerCase().includes(check) ||
          airport.iata.toLowerCase().includes(check) ||
          airport.city.toLowerCase().includes(check) ||
          airport.country.toLowerCase().includes(check)

        return result
      }))
    } else if (filter.length === 1) {
      setValidation('Please type 2 or more characters.')
      setFiltered([])
    } else {
      setValidation('')
      setFiltered([])
    }
  }, [filter])

  return <Layout>
    <h1 className='text-2xl'>Code Challenge: Airports</h1>

    <h2 className="mt-10 text-xl">All Airports</h2>

    <form>
      <label>
        <input value={filter} onChange={changeFilter} className='mt-5 flex items-center shadow p-5 border' />
      </label>
      <p>{validation}</p>
    </form>

    <div>
      {filtered.map(airport => (
        <a href={`/airports/${airport.iata.toLowerCase()}`} key={airport.iata} className='mt-5 flex items-center shadow p-5 border'>
          <div>
            {airport.name}, {airport.city}
          </div>
          <div className='ml-auto text-mono'>
            {airport.country}
          </div>
        </a>
      ))}
    </div>
  </Layout>
}

export default Page
