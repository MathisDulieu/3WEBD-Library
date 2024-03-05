import React, { useState, useEffect } from 'react';
import '../css/Home.css';

function HomePage() {
    const [bookChanges, setBookChanges] = useState([]);

    useEffect(() => {
        const fetchBookChanges = async () => {
            try {
                const response = await fetch('http://openlibrary.org/recentchanges/2024/02.json?limit=9');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBookChanges(data);
            } catch (error) {
                console.error('Error fetching book changes:', error);
            }
        };

        fetchBookChanges();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="mx-auto lg:max-w-7xl mt-3">
            <div className="container">
                <h1 className="title text-center">Discover the latest updates of the month!</h1>
                <div className="max-w-7xl mx-auto px-5 mb-3">
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8" data-testid="book-change">
                        {bookChanges.map((change, index) => (
                            <div data-testid="testid" key={index} className="max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <img className="rounded-t-lg px-5 py-2 card-image" src={getImageUrlByType(change.kind)} alt={change.kind} />
                                <div className="p-8">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{change.comment}</h5>
                                    <div className="text-sm font-bold uppercase text-teal-50 mt-1 mb-2">Type: {change.kind}</div>
                                    <div className="text-sm font-bold uppercase text-teal-50 mt-1 mb-2">Timestamp: {change.timestamp}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button
                className="fixed bottom-16 right-4 bg-gray-700 text-white px-4 py-2 rounded-full"
                onClick={scrollToTop}
            >
                Back to Top
            </button>
        </div>
    );
}

export function getImageUrlByType(type) {
    switch (type) {
        case "new-account":
            return "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";
        case "update":
            return "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";
        default:
            return "https://cdn.dribbble.com/users/11335914/screenshots/18267403/media/e0011819266e0fecb41f6ec1215f3f76.jpg";
    }
}


export default HomePage;