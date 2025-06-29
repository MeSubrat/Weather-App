import React, { useEffect, useState } from 'react'
import SearchCity from './SearchCity'
import './CurrentWeatherDetails.css'

function CurrentWeatherDetails() {
  const apikey = import.meta.env.VITE_WEATHER_API_KEY
  const baseURL = import.meta.env.VITE_BASE_URL
  const [weather, setWeather] = useState('')
  const [forecast, setForecast] = useState('')
  const [day,setDay] = useState('')
  const getWeatherDetails = (weatherReceived) => {
    setWeather(weatherReceived)
    setDay(new Date(weatherReceived.location.localtime).toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'}))
    // console.log(weatherReceived.location.localtime)
    // console.log(weatherReceived)
  }

  useEffect(() => {
    if (weather && weather.location) {
      fetch(`${baseURL}/v1/forecast.json?key=${apikey}&q=${weather.location.name}&days=7`)
        .then(res => res.json())
        .then(data => {
          // console.log(data.forecast)
          setForecast(data.forecast)
        })
        .catch(err => console.log(err))
    }
  }, [weather])

  {
    const readableDate = new Date(day).toLocaleDateString('en-US',{
      day:'numeric',
      month:'long',
      year:'numeric'
    });
  }

  return (
    <div className='weather-container'>
      <SearchCity getWeather={getWeatherDetails} />
      {!weather ? <p>Currently no details available</p> :
        (<div className='weather-details'>
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
            <h4>{weather.location.name},{weather.location.region},{weather.location.country}</h4>
          </div>
        </div>)
      }
      {forecast ? (
        <div className='forecast-section'>
          <div className="forecast-cards">
            {
              forecast.forecastday.map(day => {
                const dayName = new Date(day.date).toLocaleDateString('en-US',{weekday:'long'})
                return (
                  <div key={day.date} className='forecast-card' >
                    <p style={{fontWeight:'bold'}}>{dayName}</p>
                    <div className="icon-temp-forecast">
                      <img src={`http:${day.day.condition.icon}`} alt="" />
                      <p>{day.day.condition.text}</p>
                    </div>
                    <div className="temp">
                      <p>{day.day.maxtemp_c}°</p>
                      <p style={{color:'lightgray'}}>{day.day.mintemp_c}°</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CurrentWeatherDetails
