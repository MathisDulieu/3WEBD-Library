import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../Components/InputField';
import SelectField from '../Components/SelectField';
import BookCard from '../Components/BookCard';
import { useNavigate } from "react-router-dom";
import Pagination from '../Components/Pagination';

function AdvancedResearchAlt() {
    const [searchFilters, setSearchFilters] = useState({
        title: '',
        author: '',
        first_publish_year: '',
    });
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [sortType, setSortType] = useState('alphabetical');
    const [reverseOrder, setReverseOrder] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const handleSearch = async () => {
            setLoading(true);
            setSearchError('');

            try {
                const params = {
                    q: '',
                    sort: sortType === 'alphabetical' ? 'title' : 'rating',
                    offset: (currentPage - 1) * booksPerPage,
                    limit: booksPerPage,
                };

                if (searchFilters.title) {
                    params.q += `title:${searchFilters.title} `;
                }
                if (searchFilters.author) {
                    params.q += `author:${searchFilters.author} `;
                }
                if (searchFilters.first_publish_year) {
                    params.q += `first_publish_year:${searchFilters.first_publish_year} `;
                }

                const response = await axios.get('https://openlibrary.org/search.json', {
                    params: params,
                });
                console.log('response.data : ', response.data);
                const { docs, num_found } = response.data;
                setBooks(docs);
                setTotalResults(num_found);

                if (docs.length === 0) {
                    setSearchError('No results found.');
                }
            } catch (error) {
                console.error('Error fetching books:', error);
                setSearchError('An error occurred while fetching the books.');
            } finally {
                setLoading(false);
            }
        };

        handleSearch();
    }, [currentPage, sortType, reverseOrder, searchFilters, booksPerPage]);

    const handleFilterChange = (fieldName, value) => {
        setSearchFilters({
            ...searchFilters,
            [fieldName]: value,
        });
    };

    const handleSortTypeChange = (value) => {
        setSortType(value);
    };

    const handleReverseOrderChange = (value) => {
        setReverseOrder(value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchButtonClick = () => {
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(totalResults / booksPerPage);

    return (
        <div className="flex justify-center">
            <div className="max-w-4xl mx-auto py-8">
                <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-4 mb-4">
                        <InputField
                            value={searchFilters.title}
                            onChange={(e) => handleFilterChange('title', e.target.value)}
                            placeholder="Search by Title"
                        />
                        <InputField
                            value={searchFilters.author}
                            onChange={(e) => handleFilterChange('author', e.target.value)}
                            placeholder="Search by Author"
                        />
                        <InputField
                            value={searchFilters.first_publish_year}
                            onChange={(e) => handleFilterChange('first_publish_year', e.target.value)}
                            placeholder="Search by Publish Year"
                        />
                        <SelectField
                            value={sortType}
                            onChange={(e) => handleSortTypeChange(e.target.value)}
                            options={[
                                { value: 'alphabetical', label: 'Alphabetical' },
                                { value: 'rating', label: 'Rating' }
                            ]}
                        />
                        <SelectField
                            value={reverseOrder}
                            onChange={(e) => handleReverseOrderChange(e.target.value === 'true')}
                            options={[
                                { value: 'false', label: 'Ascending' },
                                { value: 'true', label: 'Descending' }
                            ]}
                        />
                        <button
                            onClick={handleSearchButtonClick}
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
                                <p className="text-center">Total results: {totalResults}</p>
                                <div className="flex flex-wrap justify-center">
                                    {books.map((book, index) => (
                                        <BookCard
                                            key={index}
                                            book={book}
                                            onClick={() => navigate(`/books/${book.title}/${book.author_name}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdvancedResearchAlt;
