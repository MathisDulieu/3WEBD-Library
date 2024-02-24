import React from 'react';

function SearchBar() {
    return (
        <div class='relative rounded-md m-8'>
          <div class='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-4 h-4'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </div>
          <input
            type='text'
            name='quick search'
            class='bg-slate-400 block w-full rounded-full border-0 py-1.5 pl-10 text-white placeholder:text-white placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            placeholder='Search'
          />
        </div>
    );
}

export default SearchBar;