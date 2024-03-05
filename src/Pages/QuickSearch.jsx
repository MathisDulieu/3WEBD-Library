import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookCard from '../Components/BookCard';

function QuickSearch() {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const { query } = useParams();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setSearchError('');
            try {
                const url = `http://openlibrary.org/search.json?title=${query}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const books = data.docs;
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

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollThreshold = 200;
        const backButton = document.getElementById('back-to-top');
        if (backButton) {
            if (scrollTop > scrollThreshold) {
                backButton.style.display = 'block';
            } else {
                backButton.style.display = 'none';
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-3xl text-center font-bold mb-4">Search Results for "{query}"</h2>
            {loading ? (
                <div>Loading...</div>
            ) : searchError ? (
                <div className="text-red-500">{searchError}</div>
            ) : (
                <div className="flex flex-wrap justify-center">
                    {searchResults.map((book, index) => (
                        <BookCard key={index} book={book} onClick={() => {}} />
                    ))}
                </div>
            )}
            <button
                id="back-to-top"
                className="fixed bottom-16 right-4 bg-gray-700 text-white px-4 py-2 rounded-full"
                onClick={scrollToTop}
                style={{ display: 'none' }}
            >
                Back to Top
            </button>
        </div>
    );
}

export default QuickSearch;
