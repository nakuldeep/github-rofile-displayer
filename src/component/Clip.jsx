import React from 'react'

function Clip(props) {

  return (
    <div className=' px-3 h-8 py-1 border-1 border-gray-300 rounded-3xl inline'>
        <p>{props.data || 'notFound'}</p>
    </div>
  )
}

export default Clip