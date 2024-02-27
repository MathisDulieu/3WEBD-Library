import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';



function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/quick-search/${searchQuery}`);
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className='relative rounded-md m-8'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                </svg>
            </div>
            <input
                type='text'
                name='quick search'
                value={searchQuery}
                onChange={handleChange}
                className='bg-slate-400 block w-full rounded-full border-0 py-1.5 pl-10 text-white placeholder:text-white placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                placeholder='Search'
            />
            <button
                type="submit"
                className="absolute inset-y-0 right-0 px-4 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;