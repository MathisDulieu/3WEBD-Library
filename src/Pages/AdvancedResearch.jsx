import React, { useState } from 'react';
import axios from 'axios';

function AdvancedResearch() {
    const [searchFilters, setSearchFilters] = useState({
        title: '',
        author: '',
        first_publish_year: ''
    });
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);

    const handleSearch = async () => {
        setLoading(true);
        setSearchError('');
        setCurrentPage(1);
        try {
            const params = {};
            if (searchFilters.title) {
                params.title = searchFilters.title;
            }
            if (searchFilters.author) {
                params.author = searchFilters.author;
            }
            if (searchFilters.first_publish_year) {

                params.first_publish_year = parseInt(searchFilters.first_publish_year);
                console.log("params.first_publish_year", params.first_publish_year);
            }

            const response = await axios.get('http://openlibrary.org/search.json', {
                params: params
            });
            console.log("response.data.docs : ", response.data.docs);
            const books = response.data.docs;
            setBooks(books);
            if (books.length === 0) {
                setSearchError('No results found.');
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            setSearchError('An error occurred while fetching the books.');
        } finally {
            setLoading(false);
        }
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleFilterChange = (fieldName, value) => {
        setSearchFilters({
            ...searchFilters,
            [fieldName]: value
        });
    };

    return (
        <div className="flex justify-center">
            <div className="max-w-4xl mx-auto py-8">
                <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="text"
                            value={searchFilters.title}
                            onChange={(e) => handleFilterChange('title', e.target.value)}
                            placeholder="Search by Title"
                            className="p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            value={searchFilters.author}
                            onChange={(e) => handleFilterChange('author', e.target.value)}
                            placeholder="Search by Author"
                            className="p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            value={searchFilters.first_publish_year}
                            onChange={(e) => handleFilterChange('first_publish_year', e.target.value)}
                            placeholder="Search by Publish Year"
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : searchError ? (
                        <div className="text-red-500">{searchError}</div>
                    ) : (
                        <>
                            <div>
                                <div className="flex flex-wrap justify-center">
                                    {currentBooks.map((book, index) => (
                                        <div key={index} className="relative flex w-96 sm:w-72 md:w-80 flex-col rounded-xl bg-emerald-300 bg-clip-border text-amber-50 shadow-md m-10">
                                            <div className="relative mx-6 mt-8 h-72 sm:h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                                {book.cover_i && (
                                                    <img
                                                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                                                        className="h-full w-full object-cover"
                                                        alt={book.title}
                                                    />
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <p className="block font-bold font-sans text-base leading-relaxed text-blue-gray-900 antialiased">
                                                    Title : {book.title}
                                                </p>
                                                <p className="block font-bold font-sans text-base leading-relaxed text-blue-gray-900 antialiased">
                                                    Author: {book.author_name && book.author_name.join(', ')}
                                                </p>
                                                <p className="block font-bold font-sans text-base leading-relaxed text-blue-gray-900 antialiased">
                                                    First publish year : {book.first_publish_year}
                                                </p>
                                            </div>
                                            <div className="p-6 pt-0">
                                                <button
                                                    className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                    type="button"
                                                    onClick={() => handleSearch()}
                                                >
                                                    More Informations
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ul className="flex justify-center mt-4">
                                {Array.from(
                                    { length: Math.ceil(books.length / booksPerPage) },
                                    (_, i) => (
                                        <li key={i} className="mx-1">
                                            <button
                                                onClick={() => paginate(i + 1)}
                                                className={`px-3 py-1 rounded ${
                                                    currentPage === i + 1
                                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    )
                                )}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdvancedResearch;
