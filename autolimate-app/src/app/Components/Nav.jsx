import React from 'react'

const Nav = () => {
  return (
    <nav className='w-[1120px] mx-auto my-6 py-2 flex justify-between items-center'>
      <div className='flex justify-between w-full text-black'>
      <h1 className='text-2xl font-bold text-black'>Smart Ai Agent Tracker</h1>
        <ul className='flex gap-6 items-center'>
        <li>About us</li>
        <li>Contact</li>
        <li>Features</li>
        <button className='cursor-pointer bg-linear-to-br from-zinc-700 to-gray-300 text-white rounded-sm py-1 px-3 text-bold -mr-4'>Login</button>
        <button className='cursor-pointer bg-linear-to-bl from-zinc-700 to-gray-300 text-white rounded-sm py-1 px-3 text-bold'>Sign Up</button>
      </ul>
      </div>
    </nav>
  )
}

export default Nav
