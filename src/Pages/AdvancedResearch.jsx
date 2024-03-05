import React, { useState, useEffect } from 'react'
import InputField from '../Components/InputField'
import SelectField from '../Components/SelectField'
import BookCard from '../Components/BookCard'
import { useNavigate } from 'react-router-dom'
import Pagination from '../Components/Pagination'

export function handlePageChange (currentPage, setCurrentPage, pageNumber) {
  setCurrentPage(pageNumber)
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollThreshold = 200
  const backButton = document.getElementById('back-to-top')
  if (backButton) {
    if (scrollTop > scrollThreshold) {
      backButton.style.display = 'block'
    } else {
      backButton.style.display = 'none'
    }
  }
}

function AdvancedResearchAlt () {
  const [searchFilters, setSearchFilters] = useState({
    title: '',
    author: '',
    first_publish_year: ''
  })
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage] = useState(10)
  const [sortType, setSortType] = useState('alphabetical')
  const [reverseOrder, setReverseOrder] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [searchedOnce, setSearchedOnce] = useState(false)
  const navigate = useNavigate()

  const handleFilterChange = (fieldName, value) => {
    setSearchFilters({
      ...searchFilters,
      [fieldName]: value
    })
  }

  const handleSearchButtonClick = () => {
    setSearchedOnce(true)
    setCurrentPage(1)
  }

  useEffect(() => {
    if (searchedOnce) {
      const handleSearch = async () => {
        setLoading(true)
        setSearchError('')

        try {
          let sortFilter = sortType === 'alphabetical' ? 'title' : 'rating'
          if (sortType === 'rating') {
            sortFilter = reverseOrder === true ? 'rating desc' : 'rating asc'
          }
          const params = new URLSearchParams({
            q: '',
            sort: sortFilter,
            offset: (currentPage - 1) * booksPerPage,
            limit: booksPerPage
          })

          if (searchFilters.title) {
            params.append('q', `title:${searchFilters.title}`)
          }
          if (searchFilters.author) {
            params.append('q', `author:${searchFilters.author}`)
          }
          if (searchFilters.first_publish_year) {
            params.append(
              'q',
              `first_publish_year:${searchFilters.first_publish_year}`
            )
          }

          const response = await fetch(
            `https://openlibrary.org/search.json?${params}`
          )
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const data = await response.json()
          const { docs, num_found } = data
          setBooks(docs)
          setTotalResults(num_found)

          if (docs.length === 0) {
            setSearchError('No results found.')
          }
        } catch (error) {
          console.error('Error fetching books:', error)
          setSearchError('An error occurred while fetching the books.')
        } finally {
          setLoading(false)
        }
      }

      handleSearch()
    }
  }, [
    searchedOnce,
    currentPage,
    sortType,
    searchFilters,
    booksPerPage,
    reverseOrder
  ])

  const totalPages = Math.ceil(totalResults / booksPerPage)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='flex justify-center py-8'>
      <div className='max-w-4xl mx-auto py-8'>
        <div className='flex flex-col items-center'>
          <div className='flex flex-wrap items-center space-y-4 md:space-y-0 sm:space-y-0 justify-center'>
            <div className='flex flex-col md:flex-row sm:flex-row'>
              <InputField
                value={searchFilters.title}
                onChange={e => handleFilterChange('title', e.target.value)}
                placeholder='Search by Title'
                className='w-full md:w-auto sm:w-auto'
                data-testid='title-input'
              />
              <InputField
                value={searchFilters.author}
                onChange={e => handleFilterChange('author', e.target.value)}
                placeholder='Search by Author'
                className='w-full md:w-auto sm:w-auto'
              />
              <InputField
                value={searchFilters.first_publish_year}
                onChange={e =>
                  handleFilterChange('first_publish_year', e.target.value)
                }
                placeholder='Search by Publish Year'
                className='w-full md:w-auto sm:w-auto'
              />
            </div>
            <div className='flex flex-col md:flex-row sm:flex-row'>
              <div className='flex items-center'>
                <SelectField
                  value={sortType}
                  onChange={e => setSortType(e.target.value)}
                  options={[
                    { value: 'alphabetical', label: 'Alphabetical' },
                    { value: 'rating', label: 'Rating' }
                  ]}
                  className='w-full md:w-auto sm:w-auto'
                />
                {sortType === 'rating' && (
                  <SelectField
                    value={reverseOrder}
                    onChange={e => setReverseOrder(e.target.value === 'true')}
                    options={[
                      { value: 'false', label: 'Ascending' },
                      { value: 'true', label: 'Descending' }
                    ]}
                    className='w-full md:w-auto sm:w-auto'
                  />
                )}
              </div>
              <button
                onClick={handleSearchButtonClick}
                className='bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 md:mt-0 sm:mt-0'
              >
                Search
              </button>
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : searchError ? (
            <div className='text-red-500'>{searchError}</div>
          ) : (
            <>
              <div>
                {searchedOnce && (
                  <p className='text-center'>Total results: {totalResults}</p>
                )}
                <div className='flex flex-wrap justify-center'>
                  {books.map((book, index) => (
                    <BookCard
                      key={index}
                      book={book}
                      onClick={() =>
                        navigate(`/books/${book.title}/${book.author_name}`)
                      }
                    />
                  ))}
                </div>
              </div>
              {searchedOnce && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
      <button
        id='back-to-top'
        className='fixed bottom-16 right-4 bg-gray-700 text-white px-4 py-2 rounded-full'
        onClick={scrollToTop}
        style={{ display: 'none' }}
      >
        Back to Top
      </button>
    </div>
  )
}

export default AdvancedResearchAlt
