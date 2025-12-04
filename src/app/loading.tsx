import React from 'react'

export default function loading() {
  return (
    <div className='flex justify-center items-center h-screen w-screen text-2xl font-semibold bg-black text-white'>
      <img src="/loading.gif" alt="laoding..." className='w-10'/>
    </div>
  )
}