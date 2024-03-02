import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

function BookDetails() {
    const { title, author} = useParams();
    const googleBooksEndpoint = "https://www.googleapis.com/books/v1/volumes";
    const googleBooksParams = `?q=intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`;
    const googleBooksLink = googleBooksEndpoint + googleBooksParams;

    const [bookDetails, setBookDetails] = useState(null);
    const [wikipediaLink, setWikipediaLink] = useState(null);
    const [bookImage, setBookImage] = useState(null);
    const [wikiDescription, setWikiDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(googleBooksLink);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    const bookData = data.items[0].volumeInfo;
                    setBookDetails(bookData);

                    if (bookData.authors) {
                        setBookDetails(prevState => ({ ...prevState, authors: bookData.authors.join(', ') }));
                    }
                    setWikipediaLink(`https://fr.wikipedia.org/wiki/${encodeURIComponent(title)}`);

                    if (bookData.imageLinks && bookData.imageLinks.thumbnail) {
                        setBookImage(bookData.imageLinks.thumbnail);
                    } else {
                        const query = `http://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;
                        const response = await fetch(query);
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const bookResponse = await response.json();
                        if (bookResponse.docs && bookResponse.docs.length > 0) {
                            const book = bookResponse.docs[0];
                            if (book.cover_i) {
                                setBookImage(`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`);
                            }
                        }
                    }
                } else {
                    setBookDetails(null);
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchData();
    }, [title, author, googleBooksLink]);

    useEffect(() => {
        const fetchWikipediaDescription = async () => {
            try {
                const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWikiDescription(data.extract);
            } catch (error) {
                console.error('Error fetching Wikipedia description:', error);
            }
        };

        fetchWikipediaDescription();
    }, [title]);

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                {bookImage && <img src={bookImage} alt="Book Cover" className="mb-4" />}
                {bookDetails.description && <p className="text-center mb-2">{bookDetails.description}</p>}
                {bookDetails.authors && <p><span className="font-semibold">Author(s):</span> {bookDetails.authors}</p>}
                {bookDetails.publisher && <p><span className="font-semibold">Publisher:</span> {bookDetails.publisher}</p>}
                {bookDetails.publishedDate && <p><span className="font-semibold">Published Date:</span> {bookDetails.publishedDate}</p>}
                {bookDetails.pageCount && <p><span className="font-semibold">Page Count:</span> {bookDetails.pageCount}</p>}
                {bookDetails.categories && <p><span className="font-semibold">Categories:</span> {bookDetails.categories}</p>}
                {bookDetails.language && <p><span className="font-semibold">Language:</span> {bookDetails.language}</p>}
                {bookDetails.industryIdentifiers && (
                    <p><span className="font-semibold">ISBN:</span> {bookDetails.industryIdentifiers.map(identifier => identifier.identifier)}</p>
                )}
                {bookDetails.averageRating && <p><span className="font-semibold">Rating:</span> {bookDetails.averageRating}</p>}
                {bookDetails.ratingsCount && <p><span className="font-semibold">Rating Count:</span> {bookDetails.ratingsCount}</p>}
                {wikipediaLink && <Link to={wikipediaLink} className="text-blue-700 mt-4">Wikipedia Link</Link>}
                {wikiDescription && <p><span>Wikipedia description : </span> {wikiDescription}</p>}
            </div>
        </div>
    );
}

export default BookDetails;
