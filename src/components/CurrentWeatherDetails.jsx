import React, { useEffect, useState } from 'react'
import SearchCity from './SearchCity'
import './CurrentWeatherDetails.css'
import Loader from './Loader'

function CurrentWeatherDetails() {
  const apikey = import.meta.env.VITE_WEATHER_API_KEY
  const baseURL = import.meta.env.VITE_BASE_URL
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [day, setDay] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const getWeatherDetails = (weatherReceived) => {
    setWeather(weatherReceived)
    setError('')
    setDay(new Date(weatherReceived.location.localtime).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }))
  }
  const getErrorDetails = (err) => {
    setError(err)
  }
  useEffect(() => {
    if (weather && weather.location) {
      setIsLoading(true)
      setError('')
      fetch(`${baseURL}/v1/forecast.json?key=${apikey}&q=${weather.location.name}&days=7`)
        .then(res => res.json())
        .then(data => {
          setForecast(data.forecast)
          setIsLoading(false)
        })
        .catch(err => {
          setIsLoading(false)
        })
    }
  }, [weather])


  return (
    <>
      <SearchCity getWeather={getWeatherDetails} setIsLoading={setIsLoading} getError={getErrorDetails} />

      {
        error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : isLoading ? (
          <Loader />
        ) : weather ? (
          <div className='weather-container'>
            <div className='weather-details'>
              <div className="icon-temp">
                <img src={`https:${weather.current.condition.icon}`} alt="Weather Icon" />
                <h1>{weather.current.temp_c}°C</h1>
                <div className="extra-weather-details">
                  <p>UV Index: {weather.current.uv}</p>
                  <p>Humidity: {weather.current.humidity}</p>
                  <p>Wind: {weather.current.wind_kph}</p>
                </div>
              </div>
              <div className="weather-locations">
                <h2 style={{ margin: '0' }}>{day}</h2>
                <p>{weather.current.condition.text}</p>
                <h4>{weather.location.name}, {weather.location.region}, {weather.location.country}</h4>
              </div>
            </div>

            {forecast && (
              <div className='forecast-section'>
                <div className="forecast-cards">
                  {forecast.forecastday.map(day => {
                    const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })
                    return (
                      <div key={day.date} className='forecast-card'>
                        <p style={{ fontWeight: 'bold' }}>{dayName}</p>
                        <div className="icon-temp-forecast">
                          <img src={`http:${day.day.condition.icon}`} alt="" />
                          <p>{day.day.condition.text}</p>
                        </div>
                        <div className="temp">
                          <p>{day.day.maxtemp_c}°</p>
                          <p style={{ color: 'lightgray' }}>{day.day.mintemp_c}°</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No details available</p>
        )
      }

    </>
  )
}

export default CurrentWeatherDetails
