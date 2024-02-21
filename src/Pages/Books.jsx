import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Books() {
    const [books, setBooks] = useState([]);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://openlibrary.org/search.json', {
                    params: {
                        q: 'programming',
                        limit: 12
                    }
                });
                setBooks(response.data.docs);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Books</h1>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Books;
