import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="w-full max-w-[1120px] mx-auto mt-8 mb-12 h-screen max-h-screen relative ">
      <Image 
        className='rounded-xl'
        src="/hero.webp" 
        alt="Hero image"
        fill
        priority 
      />
      <button className='border border-white rounded-full px-3 py-1 absolute text-white text-semibold top-[48%] right-[21%] cursor-pointer'>
        Read Me!
      </button>
    </div>
  )
}

export default Hero