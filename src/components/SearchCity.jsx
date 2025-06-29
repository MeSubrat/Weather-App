import React, { useState } from 'react'

function SearchCity({ getWeather }) {
    const apikey = import.meta.env.VITE_WEATHER_API_KEY
    const baseURL = import.meta.env.VITE_BASE_URL
    const [currentSearchValue, setCurrentSearchValue] = useState('')
    // const [weather, setWeather] = useState('')
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log(currentSearchValue)
            handleFetch(currentSearchValue)
            handleFetchForecast(currentSearchValue)
            setCurrentSearchValue('')
        }
    }
    const handleFetch = (city) => {
        fetch(`${baseURL}/v1/current.json?key=${apikey}&q=${city}`)
            .then(res => res.json())
            // .then(data => setWeather(data))
            .then(data => getWeather(data))
            .catch(Error => console.log(Error))
    }
    const handleFetchForecast=(city)=>{
        fetch(`${baseURL}/v1/forecast.json?key=${apikey}&q=${city}&days=7`)
            .then(res => res.json())
            .then(data=>localStorage.setItem('forecast',JSON.stringify(data)))
            .catch(err=>console.log(err))
    }
    return (

        <div style={{
            margin: '20px'
        }}>
            <input type="text" placeholder='Search your city'
                value={currentSearchValue}
                onChange={e => setCurrentSearchValue(e.target.value)} onKeyDown={handleKeyPress} />
        </div>
    )
}

export default SearchCity