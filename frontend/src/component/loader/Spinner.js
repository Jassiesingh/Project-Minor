import React from 'react'
import loading from './loading.gif'
const Spinner = () => {

  return (
    <div className='flex justify-center align-middle'>
      <img className='my-3 w-28' src={loading} alt="Loading..." />
    </div>
  )
}

export default Spinner