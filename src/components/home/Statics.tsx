import React from 'react'

export default function Statics() {
  return (
    <div className='grid max-lg:grid-cols-[1fr_4px_1fr] grid-cols-[1fr_4px_1fr_4px_1fr_4px_1fr] gap-5 w-[95%] bg-[#212121] rounded-2xl border border-[#3a3a3a] px-10 py-5'>
      <div className='flex flex-col items-center gap-2'>
        <span className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>2.5M+</span>
        <span className='text-gray-400 max-sm:text-sm'>PROFESSIONALS</span>
      </div>
      <span className='flex justify-center border-r border-[#3a3a3a]'></span>
      <div className='flex flex-col items-center gap-2'>
        <span className=' text-2xl md:text-3xl lg:text-4xl font-bold text-white'>85K+</span>
        <span className='text-gray-400 max-sm:text-sm'>LIVE JOBS</span>
      </div>
      <span className='hidden lg:block border-r border-[#3a3a3a]'></span>
      <div className='flex flex-col items-center gap-2'>
        <span className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>12K+</span>
        <span className='text-gray-400 max-sm:text-sm'>COMPANIES</span>
      </div>
      <span className='border-r border-[#3a3a3a]'></span>
      <div className='flex flex-col items-center gap-2'>
        <span className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>98%</span>
        <span className='text-gray-400 max-sm:text-sm'>MATCH RATE</span>
      </div>
    </div>
  )
}
