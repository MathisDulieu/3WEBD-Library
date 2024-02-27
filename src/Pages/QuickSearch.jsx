import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function QuickSearch() {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const { query } = useParams();

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setSearchError('');
            try {
                const url = `http://openlibrary.org/search.json?title=${query}`;
                const response = await axios.get(url);
                const books = response.data.docs;
                setSearchResults(books);
                if (books.length === 0) {
                    setSearchError('No results found.');
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchError('An error occurred while fetching the search results.');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-3xl font-bold mb-4">Search Results for "{query}"</h2>
            {loading ? (
                <div>Loading...</div>
            ) : searchError ? (
                <div className="text-red-500">{searchError}</div>
            ) : (
                <ul>
                    {searchResults.map((book, index) => (
                        <li key={index} className="border-b border-gray-200 py-4">
                            <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                            {book.cover_i && (
                                <img
                                    src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                    alt={`${book.title} cover`}
                                    className="w-24 h-auto"
                                />
                            )}
                            <p className="text-gray-700">
                                Author: {book.author_name && book.author_name.join(', ')}
                            </p>
                            <p className="text-gray-700">
                                First Publish Year: {book.first_publish_year}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default QuickSearch;