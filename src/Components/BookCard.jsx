import React from 'react';
import LibraryLogo from '../assets/LibraryLogo.png';

function BookCard({ book, onClick }) {
  return (
    <div className='relative flex w-full sm:w-72 md:w-80 flex-col rounded-xl border-gray-300 bg-clip-border text-amber-50 shadow-md m-10 shadow-grey'>
      <div className='relative mx-6 mt-8 h-72 sm:h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700'>
        {book.cover_i ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
            className='h-full w-full object-cover'
            alt={book.title}
          />
        ) : (
          <img
            src={LibraryLogo}
            className='h-full w-full object-cover'
            alt='Default Cover'
          />
        )}
      </div>
      <div className='p-6'>
        <p className='block font-bold font-sans text-base leading-relaxed text-black antialiased'>
          Title : {book.title}
        </p>
        <p className='block font-bold font-sans text-base leading-relaxed text-black antialiased'>
          Author: {book.author_name && book.author_name.join(', ')}
        </p>
        <p className='block font-bold font-sans text-base leading-relaxed text-black antialiased'>
          First publish year : {book.first_publish_year}
        </p>
        <p className='block font-bold font-sans text-base leading-relaxed text-black antialiased'>
          ISBN : {book.isbn && book.isbn[0]}
        </p>
        <p className='block font-bold font-sans text-base leading-relaxed text-black antialiased'>
          <span className='text-lg'>Rated {book.ratings_average !== undefined || null ? Math.round(book.ratings_average * 100) / 100 : 0}/5</span> for ({book.ratings_count !== undefined || null ? book.ratings_count : 0}) ratings
        </p>
      </div>
      <div className='p-6 pt-0'>
        <button
          className='block w-full select-none rounded-lg bg-emerald-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          type='button'
          onClick={onClick}
        >
          More Informations
        </button>
      </div>
    </div>
  );
}

export default BookCard;
