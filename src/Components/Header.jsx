import React from 'react'

function Header() {
    const libraryLogo = require('../assets/LibraryLogo.png')
    return (
        <header className='bg-slate-800 text-white shadow-lg'>
      <div className='container mx-auto flex xl:flex-row flex-col items-center'>
        <a
          href='/'
          className='flex items-center justify-center md:justify-start'
        >
          <img className='h-24 w-40' src={libraryLogo} alt='library logo' />
          <span className='ml-2 uppercase font-black'>Library</span>
        </a>
        <nav className='contents font-semibold text-base lg:text-lg flex-grow'>
          <ul className='flex items-center justify-center md:justify-end'>
            <li className='p-5 xl:p-8 active'>
              <a href='/books'>
                <span className='bg-black p-2 rounded-md uppercase'>Books</span>
              </a>
            </li>
            <li className='p-5 xl:p-8'>
              <a href='/login'>
                <span className='bg-black p-2 rounded-md uppercase'>Login</span>
              </a>
            </li>
            <li className='p-5 xl:p-8'>
              <a href='/register'>
                <span className='bg-black p-2 rounded-md uppercase'>
                  Register
                </span>
              </a>
            </li>
            <li className='p-5 xl:p-8'>
              <a href='/about'>
                <span className='bg-black p-2 rounded-md uppercase'>About</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    )
}

export default Header
