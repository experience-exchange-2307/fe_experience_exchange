import React from 'react'
import spinner from "../../images/spinner.png";
import './Loading.css'
function Loading() {
  return (
    <div className='loading-page'>
    <div className='loading-spinner-container'>
      <img src={spinner} className='spinner'></img>
      <p className='loading-title'>loading...</p>
    </div>
  </div>
  )
}

export default Loading
