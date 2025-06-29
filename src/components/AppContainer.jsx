import React, { useState } from 'react'
import './AppContainer.css'
import { FaCloud } from "react-icons/fa";
import CurrentWeatherDetails from './CurrentWeatherDetails';
import ForecastOf7days from './ForecastOf7days';
function AppContainer() {
    // const handleForecastDetails=()=>{

    // }
    return (
        <div className='container'>
            <CurrentWeatherDetails/>
        </div>
    )
}

export default AppContainer