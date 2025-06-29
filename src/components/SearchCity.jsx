import React, { useState } from 'react'

function SearchCity({ getWeather, setIsLoading, getError }) {
    const apikey = import.meta.env.VITE_WEATHER_API_KEY
    const baseURL = import.meta.env.VITE_BASE_URL
    const [currentSearchValue, setCurrentSearchValue] = useState('')
    // const [error,setError] = useState('')
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleFetch(currentSearchValue)
            setCurrentSearchValue('')
        }
    }
    const handleFetch = (city) => {
        if (!city) {
            alert("Please enter a city name")
            return
        }
        setIsLoading(true)
        getError('')
        fetch(`${baseURL}/v1/current.json?key=${apikey}&q=${city}`)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        throw new Error(err.error?.message || `Error ${res.status}`)
                    })
                }
                return res.json()
            })
            .then(data => {
                getWeather(data)
                setIsLoading(false)
                getError('')
            })
            .catch(error => {
                setIsLoading(false)
                getError(error.message)
            })
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