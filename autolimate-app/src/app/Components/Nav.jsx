import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className='w-[1120px] mx-auto my-6 py-2 flex justify-between items-center'>
      <div className='flex justify-between w-full text-black'>
      <Link href="/"><h1 className='text-2xl font-bold text-black'>Smart Ai Agent Tracker</h1></Link>
        <ul className='flex gap-6 items-center'>
        <Link href="/about"><li>About my Team</li></Link>
        <Link href="/join"><li>Join Us</li></Link>
        <Link href="/features"><li className='cursor-pointer'>Features</li></Link>
        <Link href="/login"><button className='cursor-pointer bg-linear-to-br from-zinc-700 to-gray-300 text-white rounded-sm py-1 px-3 text-bold -mr-4'>Login</button></Link>
        <Link href="/signup" className='cursor-pointer bg-linear-to-bl from-zinc-700 to-gray-300 text-white rounded-sm py-1 px-3 text-bold'>Sign Up</Link>
      </ul>
      </div>
    </nav>
  )
}

export default Nav
