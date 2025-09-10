import React from 'react'

function Go(props) {
  return (
    
        <a href={props.url} target='_blank' className="h-15 w-[40vw] max-w-60 font-semibold rounded-2xl border-1 border-gray-300 flex justify-center items-center sm:w-100 hover:bg-[#e9e9e9]"> <p>{props.data}</p></a>

  )
}

export default Go