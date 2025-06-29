import React, { useState } from 'react'

function ForecastOf7days() {
  const apikey = import.meta.env.VITE_WEATHER_API_KEY
  const baseURL = import.meta.env.VITE_BASE_URL

  const [forecast,setForecast]=useState(null)
  const getForecastOf7Days=()=>{
    
  }
  return (
    <div className='forecast-container'>
        
    </div>
  )
}

export default ForecastOf7days