import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdvancedResearch() {
    const [searchFilter, setSearchFilter] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [books, setBooks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setFilterValue(inputValue);
      }, 500);
  
      return () => clearTimeout(timer);
    }, [inputValue]);
  
    const handleSearch = async () => {
      setLoading(true);
      setSearchError('');
      try {
        const response = await axios.get('http://openlibrary.org/search.json', {
          params: {
            [searchFilter]: filterValue
          }
        });
        const books = response.data.docs;
        if (searchFilter === 'year') {
          const filteredBooks = books.filter(book => book.first_publish_year === filterValue);
          setBooks(filteredBooks);
        } else {
          setBooks(books);
        }
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

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Advanced Search</h1>
            <div className="flex items-center space-x-4 mb-4">
                <select 
                    className="p-2 border border-gray-300 rounded"
                    value={searchFilter} 
                    onChange={(e) => setSearchFilter(e.target.value)}
                >
                    <option value="">Select Filter</option>
                    <option value="title">By Title</option>
                    <option value="author">By Author</option>
                    <option value="year">By Year</option>
                </select>
                {searchFilter && (
                    <input 
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter search value"
                        className="p-2 border border-gray-300 rounded flex-grow"
                    />
                )}
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
                <ul>
                    {books.map((book, index) => (
                        <li key={index} className="border-b border-gray-200 py-4">
                            <Link to={`/books/${book.id_wikidata}`} className="text-blue-500 hover:underline">
                                <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                            </Link>
                            <p className="text-gray-700">Author: {book.author_name && book.author_name.join(', ')}</p>
                            <p className="text-gray-700">First Publish Year: {book.first_publish_year}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdvancedResearch;
