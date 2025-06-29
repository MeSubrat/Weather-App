import React, { useEffect, useState } from 'react'
import SearchCity from './SearchCity'
import './CurrentWeatherDetails.css'
import Loader from './Loader'
import { motion } from 'framer-motion'

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
          <motion.div className='weather-container'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className='weather-details'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="icon-temp">
                <img src={`https:${weather.current.condition.icon}`} alt="Weather Icon" />
                <h1 style={{ color: '#ffffff' }}>{weather.current.temp_c}°C</h1>
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
            </motion.div>

            {forecast && (
              <motion.div className='forecast-section'
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                <div className="forecast-cards">
                  {forecast.forecastday.map(day => {
                    const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })
                    return (
                      <motion.div key={day.date} 
                      className='forecast-card'
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <p style={{ fontWeight: 'bold' }}>{dayName}</p>
                        <div className="icon-temp-forecast">
                          <img src={`http:${day.day.condition.icon}`} alt="" />
                          <p>{day.day.condition.text}</p>
                        </div>
                        <div className="temp">
                          <p>{day.day.maxtemp_c}°</p>
                          <p style={{ color: 'lightgray' }}>{day.day.mintemp_c}°</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <p>No details available</p>
        )
      }

    </>
  )
}

export default CurrentWeatherDetails
