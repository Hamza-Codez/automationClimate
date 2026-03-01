import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (

    <div className="w-full max-w-[1120px] mx-auto mt-8 mb-12 relative aspect-[16/9] md:aspect-auto md:h-[600px] lg:h-[700px]">
      <Image 
        className='lg:rounded-xl rounded-none object-cover'
        src="/hero.webp" 
        alt="Hero image"
        fill
        priority 
      />
      
      <Link href="/about">
        <button className='border border-white rounded-full px-4 py-1.5 absolute text-white font-semibold top-[48%] right-[19%] cursor-pointer hover:bg-white/10 transition-colors text-sm md:text-base whitespace-nowrap'>
          Read Me!
        </button>
      </Link>
    </div>
  )
}

export default Hero