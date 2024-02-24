import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BookDetail() {
    const { wikidataId } = useParams(); // Obtenez l'ID Wikidata à partir de l'URL
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                // Récupérer les informations du livre à partir de votre backend
                const response = await axios.get(`http://localhost:5000/book-details/${wikidataId}`);
                setBookDetails(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        // Appeler la fonction pour récupérer les détails du livre lorsque l'ID Wikidata change
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
            {/* Affichez d'autres informations détaillées sur le livre */}
        </div>
    );
}

export default BookDetail;
