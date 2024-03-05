import React from 'react'
import loading from '../gifs/loading.gif'
const Spinner = () => {
  return (
    <div class="d-flex align-items-center justify-content-center">
      <div>
        <img src={loading} alt="loading..." />
      </div>
    </div>
  )
}

export default Spinner