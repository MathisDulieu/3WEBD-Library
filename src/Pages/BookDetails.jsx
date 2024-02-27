import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

function BookDetails() {
    const { title } = useParams();
    const googleBooksEndpoint = "https://www.googleapis.com/books/v1/volumes";
    const googleBooksParams = `?q=${encodeURIComponent(title)}&langRestrict=fr`;

    const googleBooksLink = googleBooksEndpoint + googleBooksParams;

    const [bookDetails, setBookDetails] = useState(null);
    const [wikipediaLink, setWikipediaLink] = useState(null);
    const [bookImage, setBookImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(googleBooksLink);
                if (response.data.items && response.data.items.length > 0) {
                    const bookData = response.data.items[0].volumeInfo;
                    setBookDetails(bookData);
                    setWikipediaLink(`https://fr.wikipedia.org/wiki/${encodeURIComponent(title)}`);

                    if (bookData.imageLinks && bookData.imageLinks.thumbnail) {
                        setBookImage(bookData.imageLinks.thumbnail);
                    }
                } else {
                    setBookDetails(null);
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchData();
    }, [title, googleBooksLink]);

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{title}</h1>
            {bookImage && <img src={bookImage} alt="Book Cover" />}
            <p>{bookDetails.description}</p>
            <p>Author(s): {bookDetails.authors}</p>
            <p>Publisher: {bookDetails.publisher}</p>
            <p>Published Date: {bookDetails.publishedDate}</p>
            <p>Page Count: {bookDetails.pageCount}</p>
            <p>Categories: {bookDetails.categories}</p>
            <p>Language: {bookDetails.language}</p>
            <p>ISBN: {bookDetails.industryIdentifiers.map(identifier => identifier.identifier)}</p>
            <p>Rating: {bookDetails.averageRating}</p>
            <p>Rating Count: {bookDetails.ratingsCount}</p>
            <Link to={wikipediaLink} className="text-blue-700">Wikipedia Link</Link>
        </div>
    );
}

export default BookDetails;
