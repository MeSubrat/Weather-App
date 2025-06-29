import React, { useState } from 'react'

function SearchCity({ getWeather, setIsLoading}) {
    const apikey = import.meta.env.VITE_WEATHER_API_KEY
    const baseURL = import.meta.env.VITE_BASE_URL
    const [currentSearchValue, setCurrentSearchValue] = useState('')
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleFetch(currentSearchValue)
            setCurrentSearchValue('')
        }
    }
    const handleFetch = (city) => {
        setIsLoading(true)
        fetch(`${baseURL}/v1/current.json?key=${apikey}&q=${city}`)
            .then(res => res.json())
            .then(data => {
                getWeather(data)
                setIsLoading(false)
            })
            .catch(Error => console.log(Error))
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