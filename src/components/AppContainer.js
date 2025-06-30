import React, { useState } from 'react'
import './AppContainer.css'
import CurrentWeatherDetails from './CurrentWeatherDetails';
function AppContainer() {
    return (
        <div className='container'>
            <CurrentWeatherDetails />
        </div >
    )
}

export default AppContainer