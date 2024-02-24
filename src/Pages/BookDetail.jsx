import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BookDetail() {
    const { wikidataId } = useParams();
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                const response = await axios.get(`http://${wikidataId}`);
                setBookDetails(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        getBookDetails();
    }, [wikidataId]);

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{bookDetails.title}</h1>
            <p>Auteur: {bookDetails.author_name && bookDetails.author_name.join(", ")}</p>
            <p>First Publish Year: {bookDetails.first_publish_year}</p>
        </div>
    );
}

export default BookDetail;
