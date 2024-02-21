import React from 'react'

function Header_Alt () {
    const libraryLogo = require('../assets/LibraryLogo.png')
  return (
    <header class='bg-slate-800 text-white shadow-lg hidden md:block'>
      <div class='container mx-auto flex items-center h-24'>
        <a href='/' class='flex items-center justify-center'>
          {/* insert the image of the library*/}
          <img
            class='h-24 w-40'
            src={libraryLogo}
            alt=''
          />
          <span class='ml-4 uppercase font-black'>
            Library
          </span>
        </a>
        <nav class='contents font-semibold text-base lg:text-lg'>
          <ul class='mx-auto flex items-center'>
            <li class='p-5 xl:p-8 active'>
              <a href='/books'>
                <span>Books</span>
              </a>
            </li>
            <li class='p-5 xl:p-8'>
              <a href='/login'>
                <span>Login</span>
              </a>
            </li>
            <li class='p-5 xl:p-8'>
              <a href='/register'>
                <span>Register</span>
              </a>
            </li>
            <li class='p-5 xl:p-8'>
              <a href='/about'>
                <span>About</span>
              </a>
            </li>
          </ul>
        </nav>
        <div class='w-auto max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-slate-800 rounded-md hidden xl:flex items-center'>
          <select
            class='bg-slate-800 uppercase font-bold text-sm p-4 mr-1'
            name=''
            id=''
          >
            <option>all categories</option>
            <option>By Author</option>
            <option>By Title</option>
          </select>
          <input
            class='border-l border-gray-300 bg-slate-300 font-semibold text-sm pl-4 text-black'
            type='text'
            placeholder="I'm searching for ..."
          />
          <svg
            class='ml-auto h-5 px-4 text-gray-500 svg-inline--fa fa-search fa-w-16 fa-9x'
            aria-hidden='true'
            focusable='false'
            data-prefix='far'
            data-icon='search'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z'
            ></path>
          </svg>
        </div>
      </div>
    </header>
  )
}

export default Header_Alt
