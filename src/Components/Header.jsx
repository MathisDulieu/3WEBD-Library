import React from 'react';
import SearchBar from './SearchBar';

function Header() {
    const libraryLogo = require('../assets/LibraryLogo.png');
    return (
        <header className='bg-slate-800 text-white shadow-lg'>
            <div className='container mx-auto flex flex-col items-center justify-between xl:flex-row'>
                <a href='/' className='flex items-center justify-center md:justify-start'>
                    <img className='h-24 w-40' src={libraryLogo} alt='library logo' />
                    <span className='ml-2 uppercase font-black'>Library</span>
                </a>
                <nav className='contents font-semibold text-base lg:text-lg flex-grow mt-4 md:mt-0'>
                    <ul className='flex flex-col md:flex-row items-center justify-center md:justify-end'>
                        <li className='p-5 xl:p-8 active'>
                            <a href='/advanced-search'>
                                <span className='p-2 rounded-md uppercase'>
                                    Research
                                </span>
                            </a>
                        </li>
                        <li className='p-5 xl:p-8'>
                            <a href='/login'>
                                <span className='p-2 rounded-md uppercase'>Login</span>
                            </a>
                        </li>
                        <li className='p-5 xl:p-8'>
                            <a href='/register'>
                                <span className='p-2 rounded-md uppercase'>
                                    Register
                                </span>
                            </a>
                        </li>
                        <li className='p-5 xl:p-8'>
                            <a href='/about'>
                                <span className='p-2 rounded-md uppercase'>About</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="w-full md:w-96 mt-4 md:mt-0" data-testid="search-bar">
                    <SearchBar />
                </div>
            </div>
        </header>
    );
}

export default Header;
