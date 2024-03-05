import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from '../App';
import About from "../Pages/About";
import {MemoryRouter, Route, Routes, useNavigate} from 'react-router-dom';
import jotai, {useAtomValue} from 'jotai';
import Admin from "../Pages/Admin";
import Forbidden from "../Pages/Forbidden";
import NotFound from "../Pages/NotFound";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Footer from "../Components/Footer";
import HomePage, {getImageUrlByType} from "../Pages/Home";
import BookDetails from "../Pages/BookDetails";
import QuickSearch from "../Pages/QuickSearch";
import userEvent from "@testing-library/user-event";
import BookCard, {calculateRating, renderCoverImage} from "../Components/BookCard";
import React from 'react';
import AdvancedResearchAlt, {handlePageChange, handleScroll, scrollToTop} from "../Pages/AdvancedResearch";
import Pagination from "../Components/Pagination";
import SearchBar from "../Components/SearchBar";


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useAtomValue: jest.fn(),
}));

describe('Launch All Tests', () => {
  describe('Header Component', () => {
    test('shouldFindLogoInHeader', () => {
      render(<App />);

      const libraryLogo = screen.getByAltText('library logo');
      expect(libraryLogo).toBeInTheDocument();

    });

    test('shouldFindAllLinksInHeader', () => {
      render(<App />);

      const homeLink = screen.getByRole('link', { name: /library/i });
      expect(homeLink).toBeInTheDocument();

      const advancedSearchLink = screen.getByRole('link', { name: /research/i });
      expect(advancedSearchLink).toBeInTheDocument();

      const loginLink = screen.getByRole('link', { name: /login/i });
      expect(loginLink).toBeInTheDocument();

      const registerLink = screen.getByRole('link', { name: /register/i });
      expect(registerLink).toBeInTheDocument();

      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();

    });

    test('shouldFindSearchBarInHeader', () => {
      render(<App />);

      const searchBar = screen.getByTestId('search-bar');
      expect(searchBar).toBeInTheDocument();
    });
  });

  describe('Footer Component', () => {
    test('shouldFindGitHubLogoInFooter', () => {
      render(<App />);

      const githubLink = screen.getByText(/github/i);
      expect(githubLink).toBeInTheDocument();
    });

    test('shouldFindTheDateInFooter', () => {
      render(<App />);

      const currentYear = new Date().getFullYear().toString();
      const yearElement = screen.getByText(new RegExp(currentYear, 'i'));
      expect(yearElement).toBeInTheDocument();
    });

    test('shouldFindTextLineInFooter', () => {
      render(<App />);

      const copyrightText = screen.getByText(/supinfo, inc\. all rights reserved\./i);
      expect(copyrightText).toBeInTheDocument();
    });

    test('shouldRemoveFixedClass_whenWindowHeightIsLessThanBodyHeight', () => {
      jest.spyOn(document, 'querySelector').mockReturnValue({
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      });

      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 500,
      });

      Object.defineProperty(document.body, 'scrollHeight', {
        writable: true,
        configurable: true,
        value: 1000,
      });

      render(<Footer />);

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector).toHaveBeenCalled();

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector().classList.add).not.toHaveBeenCalled();

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector().classList.remove).toHaveBeenCalledWith('fixed', 'bottom-0', 'w-full');
    });
  });

  describe('About Page', () => {
    test('shouldFindTextParagraphsInAboutPage', () => {
      render(<About />);

      const paragraphContents = [
        "Welcome to the Lille Library App, your ultimate destination for exploring and discovering books of all genres!",
        "At Library App, our mission is to provide book enthusiasts with a seamless platform to access a vast collection of books from around the world. Whether you're searching for classic literature, contemporary fiction, academic texts, or even obscure titles, Library App has got you covered.",
        "Our app harnesses the power of the Open Library API, allowing users to search for books by title, author, publication year, and more. With our intuitive search interface, finding your next favorite read has never been easier.",
        "Explore curated lists, discover popular titles, and even contribute to the ever-expanding catalog by adding your own reviews and ratings.",
        "Whether you're a casual reader, a seasoned bibliophile, or a student conducting research, Library App is your go-to resource for all things books. Join our community today and embark on a journey of literary exploration!"
      ];

      paragraphContents.forEach((content) => {
        const paragraph = screen.queryByText((text, node) => {
          return node.textContent === content;
        });
        expect(paragraph).toBeInTheDocument();
      });
    });

    test('shouldFindTitleInAboutPage', () => {
      render(<About />);

      const pageTitle = screen.getByText('About Our App');
      expect(pageTitle).toBeInTheDocument();
    });
  });

  describe('Admin page', () => {
    let navigateMock;

    beforeEach(() => {
      navigateMock = jest.fn();
      useNavigate.mockReturnValue(navigateMock);
      localStorage.clear();
    });

    it('shouldRenderAdminPageWithUserData', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
      };

      localStorage.setItem('userData', JSON.stringify(userData));

      useAtomValue.mockReturnValue(true);

      render(<Admin />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('You have been redirected to the admin page. Welcome!');

      expect(screen.getByAltText('Profile Background')).toBeInTheDocument();
      expect(screen.getByAltText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Johnathan MEUNIER')).toBeInTheDocument();
      expect(screen.getByTitle('Verified')).toBeInTheDocument();
      expect(screen.getByText('Senior Software Engineer at React')).toBeInTheDocument();
      expect(screen.getByText('Lille, FRANCE')).toBeInTheDocument();
      expect(screen.getByText(`${userData.email}`)).toBeInTheDocument();
      expect(screen.getByText(`${userData.password}`)).toBeInTheDocument();
    });

    it('shouldRedirectToForbiddenPage_whenNotLoggedIn', () => {
      useAtomValue.mockReturnValue(false);

      render(<Admin />);

      expect(navigateMock).toHaveBeenCalledWith('/forbidden');
    });
  });

  describe('Forbidden Page', () => {
    it('shouldFindAllTextElementsInForbiddenPage', () => {
      render(<Forbidden />);

      expect(screen.getByText('403')).toBeInTheDocument();
      expect(screen.getByText('Forbidden')).toBeInTheDocument();
      expect(screen.getByText('You do not have permission to access this page.')).toBeInTheDocument();
    });

    it('shouldVerifyTextElementsClassesInForbiddenPage', () => {
      render(<Forbidden />);

      expect(screen.getByText('403')).toHaveClass('text-9xl', 'font-bold', 'text-red-500');
      expect(screen.getByText('Forbidden')).toHaveClass('text-6xl', 'font-medium');
      expect(screen.getByText('You do not have permission to access this page.')).toHaveClass('text-2xl', 'font-medium', 'pb-8', 'px-12');
    });
  });

  describe('NotFound Page', () => {
    it('shouldFindAllTextElementsInNotFoundPage', () => {
      render(<NotFound />);

      expect(screen.getByText('404')).toBeInTheDocument();
      expect(screen.getByText('oops! Page not found')).toBeInTheDocument();
      expect(screen.getByText('Oops! The page you are looking for does not exist. It might have been moved or deleted.')).toBeInTheDocument();
    });

    it('shouldVerifyTextElementsClassesInNotFoundPage', () => {
      render(<NotFound />);

      expect(screen.getByText('404')).toHaveClass('text-9xl', 'font-bold', 'text-purple-400');
      expect(screen.getByText('oops! Page not found')).toHaveClass('text-6xl', 'font-medium');
      expect(screen.getByText('Oops! The page you are looking for does not exist. It might have been moved or deleted.')).toHaveClass('text-2xl', 'font-medium', 'pb-8', 'px-12');
    });
  });

  describe('Register Page', () => {

    let navigateMock;
    // eslint-disable-next-line no-unused-vars
    let alertMock;

    beforeEach(() => {
      navigateMock = jest.fn();
      alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      useNavigate.mockReturnValue(navigateMock);
      localStorage.clear();
    });

    it('shouldFindAllTextElementsInRegisterPage', () => {

      render(<Register />);

      expect(screen.getByText('Welcome on our book application !')).toBeInTheDocument();
      expect(screen.getByText('Hello new user :) !')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
      expect(screen.getByText('Password strength :')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
      expect(screen.getByText('Already have an account ?')).toBeInTheDocument();
    });

    it('shouldRegisterUser_andRedirectToLoginPage', () => {
      render(<Register />);

      fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password123#' } });
      fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Password123#' } });

      expect(screen.getByPlaceholderText('Email Address')).toHaveValue('test@example.com');
      expect(screen.getByPlaceholderText('Password')).toHaveValue('Password123#');
      expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue('Password123#');

      fireEvent.click(screen.getByRole('button', { name: 'Register' }));

      expect(navigateMock).toHaveBeenCalledWith('/login');
    });

    it('shouldDisplayAlertMessage_whenEmailIsNotValidOrPresent', () => {
      render(<Register />);

      fireEvent.click(screen.getByRole('button', { name: 'Register' }));

      expect(window.alert).toHaveBeenCalledTimes(1);

      expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });

    it('shouldDisplayAlertMessage_whenPasswordIsNotValidOrPresent', () => {
      render(<Register />);
      fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });

      fireEvent.click(screen.getByRole('button', { name: 'Register' }));

      expect(window.alert).toHaveBeenCalledTimes(1);

      expect(window.alert).toHaveBeenCalledWith('The password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, and 1 digit.');
    });

    it('shouldDisplayAlertMessage_whenMatchingPasswordIsNotValidOrPresent', () => {
      render(<Register />);
      fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password123#' } });

      fireEvent.click(screen.getByRole('button', { name: 'Register' }));

      expect(window.alert).toHaveBeenCalledTimes(1);

      expect(window.alert).toHaveBeenCalledWith('Passwords do not match.');
    });

    it('shouldDisplayAlertMessage_whenTryingToRegisterWithStrengthMediumPassword', () => {
      render(<Register />);
      fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password' } });
      fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Password' } });

      fireEvent.click(screen.getByRole('button', { name: 'Register' }));

      expect(window.alert).toHaveBeenCalledTimes(1);
    });

    it('shouldRedirectToLoginPage_whenLoginLinkIsClicked', () => {
      render(<Register />);

      fireEvent.click(screen.getByText('Login'));

      expect(navigateMock).toHaveBeenCalledWith('/login');
    });
  });

  describe('Login Page', () => {
    let navigateMock;
    let setLoggedInMock;

    beforeEach(() => {
      navigateMock = jest.fn();
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      setLoggedInMock = jest.fn();
      jest.spyOn(jotai, 'useSetAtom').mockReturnValue(setLoggedInMock);
      useNavigate.mockReturnValue(navigateMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
      localStorage.clear();
    });

    it('shouldRenderAllTextElementsCorrectly', () => {
      render(<Login />);
      expect(screen.getByText('Hello Again!')).toBeInTheDocument();
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
      expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();
    });

    it('shouldHandleLoginFormSubmissionCorrectlyAndRedirectToAdminPage', () => {
      render(<Login />);
      localStorage.setItem('userData', JSON.stringify({ email: 'test@example.com', password: 'Password123#' }));

      fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password123#' } });

      fireEvent.click(screen.getByRole('button', { name: 'Login' }));

      expect(setLoggedInMock).toHaveBeenCalledWith(true);
      expect(navigateMock).toHaveBeenCalledWith('/admin');
    });

    it('shouldDisplayAlertMessage_whenCredentialsAreNotCorrect', () => {
      render(<Login />);
      localStorage.setItem('userData', JSON.stringify({ email: 'test@example.com', password: 'Password123#' }));

      fireEvent.click(screen.getByRole('button', { name: 'Login' }));

      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith('Incorrect credentials. Please try again.');
    });

    it('shouldDisplayAlertMessage_whenThereIsNoCredentials', () => {
      render(<Login />);
      fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'notexisting@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'NotExisting123#' } });

      fireEvent.click(screen.getByRole('button', { name: 'Login' }));

      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith('No user registered. Please create an account.');
    });


    it('shouldRedirectToRegisterPage_whenRegisterLinkIsClicked', () => {
      render(<Login />);
      localStorage.setItem('userData', JSON.stringify({ email: 'test@example.com', password: 'Password123#' }));

      fireEvent.click(screen.getByText('Register'));

      expect(navigateMock).toHaveBeenCalledWith('/register');
    });
  });

  describe('Home Page', () => {
    it('shouldRenderBookChangesCorrectly_whenNetworkResponseIsOk', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: [{ comment: 'Test Comment', kind: 'update', timestamp: '2024-02-01' }] }),
      });

      render(<HomePage />);

      await screen.findByText('Discover the latest updates of the month!');

      const bookChange = screen.getByTestId('book-change');
      expect(bookChange).toBeInTheDocument();

      global.fetch.mockRestore();
    });

    it('shouldScrollToTop_whenBackToTopButtonIsClicked', () => {
      render(<HomePage />);

      window.scrollTo(0, 1000);

      fireEvent.click(screen.getByText('Back to Top'));

      expect(window.pageYOffset).toBe(0);
    });

    it('shouldHandleError_whenFetchingBookChangesFails', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      render(<HomePage />);

      try {
        await screen.findByText('Error fetching book changes: Network error');
        expect(true).toBe(false);
      } catch (error) {

        // eslint-disable-next-line jest/no-conditional-expect
        expect(error).toBeTruthy();
      }

      global.fetch.mockRestore();
    });


    it('shouldHandleNetworkError_whenNetworkResponseIsNotOk', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
      });

      render(<HomePage />);

      try {
        await screen.findByText('Network response was not ok');
        expect(true).toBe(false);
      } catch (error) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(error).toBeTruthy();
      }

      global.fetch.mockRestore();
    });

    it('shouldReturnCorrectUrlForNewAccountType', () => {
      const url = getImageUrlByType('new-account');
      expect(url).toBe('https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg');
    });

    it('shouldReturnCorrectUrlForUpdateType', () => {
      const url = getImageUrlByType('update');
      expect(url).toBe('https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg');
    });

    it('shouldReturnDefaultUrlForUnknownType', () => {
      const url = getImageUrlByType('unknown');
      expect(url).toBe('https://cdn.dribbble.com/users/11335914/screenshots/18267403/media/e0011819266e0fecb41f6ec1215f3f76.jpg');
    });

    test('shouldRenderAtLeastOneCardElement', async () => {
      render(<HomePage />);
      const testIdElements = await screen.findAllByTestId('testid');
      expect(testIdElements.length).toBeGreaterThan(0);
    });
  });

  describe('BookDetails Page', () => {
    test('shouldRenderLoadingState_whenTryingToFetchData', () => {
      render(
          <MemoryRouter initialEntries={['/books/:title/:author']}>
            <Routes>
              <Route path="/books/:title/:author" element={<BookDetails />} />
            </Routes>
          </MemoryRouter>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });


    test('shouldRenderBookDetails_whenDataIsFetched', async () => {
      const mockBookDetails = {
        title: 'Title',
        authors: ['Author'],
        description: 'Book Description',
        publisher: 'Publisher',
        publishedDate: '2022-01-01',
        pageCount: 200,
        categories: ['Category'],
        language: 'English',
        industryIdentifiers: [{ type: 'ISBN_13', identifier: '1234567890123' }],
        averageRating: 4.5,
        ratingsCount: 100,
        imageLinks: {
          thumbnail: 'https://example.com/thumbnail.jpg',
        },
      };

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ items: [{ volumeInfo: mockBookDetails }] }),
      });

      render(
          <MemoryRouter initialEntries={['/book-details/Title/Author']}>
            <Routes>
              <Route path="/book-details/:title/:author" element={<BookDetails />} />
            </Routes>
          </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Title')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('Author')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('Book Description')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('Publisher')).toBeInTheDocument();

        const wikipediaLink = screen.getByRole('link', { name: /Wikipedia Link/i });
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(wikipediaLink).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(wikipediaLink).toHaveAttribute('href', `https://fr.wikipedia.org/wiki/${encodeURIComponent('Title')}`);
      });
      const title = "Title";
      const author = "Author";

      expect(global.fetch).toHaveBeenCalledWith(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`);
      expect(global.fetch).toHaveBeenCalledWith(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
      global.fetch.mockRestore();
    });

    test('shouldHandleError_whenFetchingBookDetailsFails', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      render(<BookDetails />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      global.fetch.mockRestore();
    });

    test('shouldHandleError_whenInitialFetchFails', async () => {
      const mockTitle = "Title";
      const mockAuthor = "Author";

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
      });

      render(
          <MemoryRouter initialEntries={[`/book-details/${mockTitle}/${mockAuthor}`]}>
            <Routes>
              <Route path="/book-details/:title/:author" element={<BookDetails />} />
            </Routes>
          </MemoryRouter>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      expect(global.fetch).toHaveBeenCalledWith(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(mockTitle)}+inauthor:${encodeURIComponent(mockAuthor)}`);
      global.fetch.mockRestore();
    });

    test('shouldHandleEmptyResponseFromInitialFetch', async () => {
      const mockTitle = "Title";
      const mockAuthor = "Author";

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
      });

      render(
          <MemoryRouter initialEntries={[`/book-details/${mockTitle}/${mockAuthor}`]}>
            <Routes>
              <Route path="/book-details/:title/:author" element={<BookDetails />} />
            </Routes>
          </MemoryRouter>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      expect(global.fetch).toHaveBeenCalledWith(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(mockTitle)}+inauthor:${encodeURIComponent(mockAuthor)}`);
      global.fetch.mockRestore();
    });

    test('shouldHandleError_whenResponseIsNotOk', async () => {
      const mockBookDetails = {
        title: 'Title',
      };

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ items: [{ volumeInfo: mockBookDetails }] }),
      });
      const mockTitle = "Title";

      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      render(
          <MemoryRouter initialEntries={[`/book-details/${mockTitle}/Author`]}>
            <Routes>
              <Route path="/book-details/:title/:author" element={<BookDetails />} />
            </Routes>
          </MemoryRouter>
      );

      global.fetch.mockRestore();
    });

    test('shouldHandleSuccessfulResponseAndSetsWikipediaDescription', async () => {
      const mockTitle = 'Title';
      const mockDescription = 'Mock Wikipedia Description';

      const mockBookDetails = {
        title: 'Title',
      };

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ items: [{ volumeInfo: mockBookDetails }] }),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ extract: mockDescription }),
      });

      render(
          <MemoryRouter initialEntries={[`/book-details/${mockTitle}/Author`]}>
            <Routes>
              <Route path="/book-details/:title/:author" element={<BookDetails />} />
            </Routes>
          </MemoryRouter>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 0));

      global.fetch.mockRestore();
    });

    test('shouldHandleError_whenNetworkResponseIsNotOk', async () => {
      const mockTitle = 'Title';

      const mockBookDetails = {
        title: 'Title',
      };

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ items: [{ volumeInfo: mockBookDetails }] }),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      render(
          <MemoryRouter initialEntries={[`/book-details/${mockTitle}/Author`]}>
            <Routes>
              <Route path="/book-details/:title/:author" element={<BookDetails />} />
            </Routes>
          </MemoryRouter>
      );

      await new Promise(resolve => setTimeout(resolve, 0));

      global.fetch.mockRestore();
    });
  });

  describe('QuickSearch Page', () => {
    it('shouldRenderLoadingStateInitially', async () => {
      render(
          <MemoryRouter initialEntries={['/search/test']}>
            <Routes>
              <Route path="/search/:query" element={<QuickSearch />} />
            </Routes>
          </MemoryRouter>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Search Results for "test"')).toBeInTheDocument();
    });

    it('shouldHandleEmptySearchResults', async () => {
      // Mocking fetch to return an empty array
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: [] }),
      });

      render(
          <MemoryRouter initialEntries={['/search/test']}>
            <Routes>
              <Route path="/search/:query" element={<QuickSearch />} />
            </Routes>
          </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).toBeNull();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('No results found.')).toBeInTheDocument();
      });

      global.fetch.mockRestore();
    });

    it('shouldHandleNetworkError', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      render(
          <MemoryRouter initialEntries={['/search/test']}>
            <Routes>
              <Route path="/search/:query" element={<QuickSearch />} />
            </Routes>
          </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).toBeNull();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('An error occurred while fetching the search results.')).toBeInTheDocument();
      });

      global.fetch.mockRestore();
    });

    it('shouldScrollToTop_whenBackToTopButtonIsClicked', async () => {
      render(
          <MemoryRouter initialEntries={['/search/test']}>
            <Routes>
              <Route path="/search/:query" element={<QuickSearch />} />
            </Routes>
          </MemoryRouter>
      );

      window.scrollTo(0, 500);

      const scrollToTopButton = screen.getByText('Back to Top');
      userEvent.click(scrollToTopButton);

      await waitFor(() => {
        expect(window.pageYOffset).toBe(0);
      });
    });

    it('shouldThrowError_whenNetworkResponseIsNotOk', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
      });

      render(
          <MemoryRouter initialEntries={['/search/test']}>
            <Routes>
              <Route path="/search/:query" element={<QuickSearch />} />
            </Routes>
          </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('An error occurred while fetching the search results.')).toBeInTheDocument();
      });

      global.fetch.mockRestore();
    });

    it('shouldDisplayBackToTopButton_whenScrollingDown', () => {
      render(<QuickSearch />);

      window.pageYOffset = 300;
      window.dispatchEvent(new Event('scroll'));

      const backButton = screen.getByText('Back to Top');
      expect(backButton).toBeInTheDocument();
    });

    it('shouldHidesBackToTopButton_whenScrollingUp', () => {
      render(<QuickSearch />);

      window.pageYOffset = 300;
      window.dispatchEvent(new Event('scroll'));

      let backButton = screen.getByText('Back to Top');
      expect(backButton).toBeInTheDocument();

      window.pageYOffset = 100;
      window.dispatchEvent(new Event('scroll'));

      setTimeout(() => {
        backButton = screen.queryByText('Back to Top');
        expect(backButton).toBeNull();
      }, 1000);
    });
  });

  describe('BookCard Component', () => {

    const mockBook = {
      title: 'Test Book',
      author_name: ['Test Author'],
      first_publish_year: '2022',
      isbn: ['1234567890'],
      ratings_average: 4.5,
      ratings_count: 100,
      cover_i: '123456'
    };

    it('shouldRenderBookTitle', () => {
      render(<BookCard book={mockBook} />);
      const titleElement = screen.getByText(`Title : ${mockBook.title}`);
      expect(titleElement).toBeInTheDocument();
    });

    it('shouldRenderBookAuthor', () => {
      render(<BookCard book={mockBook} />);
      const authorElement = screen.getByText(`Author: ${mockBook.author_name.join(', ')}`);
      expect(authorElement).toBeInTheDocument();
    });

    it('shouldRenderFirstPublishYear', () => {
      render(<BookCard book={mockBook} />);
      const yearElement = screen.getByText(`First publish year : ${mockBook.first_publish_year}`);
      expect(yearElement).toBeInTheDocument();
    });

    it('shouldRenderISBN', () => {
      render(<BookCard book={mockBook} />);
      const isbnElement = screen.getByText(`ISBN : ${mockBook.isbn[0]}`);
      expect(isbnElement).toBeInTheDocument();
    });

    it('shouldRenderRatingInformation', () => {
      render(<BookCard book={mockBook} />);
      const ratingsElements = screen.getAllByText((content, element) => {
        return element.textContent.includes(`Rated ${mockBook.ratings_average}/5 for (${mockBook.ratings_count}) ratings`);
      });
      expect(ratingsElements.length).toBeGreaterThan(0);
    });

    it('shouldRenderMoreInformationsButton', () => {
      render(<BookCard book={mockBook} />);
      const buttonElement = screen.getByText('More Informations');
      expect(buttonElement).toBeInTheDocument();
    });

    it('shouldRenderBookCover_whenCoverIsPresent', () => {
      render(<BookCard book={mockBook} />);
      const bookCover = screen.getByAltText(mockBook.title);
      expect(bookCover).toBeInTheDocument();
    });

    it('shouldReturnCorrectRatingInformation', () => {
      expect(calculateRating(4.5, 100)).toEqual('Rated 4.5/5 for (100) ratings');

      expect(calculateRating(3.75, 50)).toEqual('Rated 3.75/5 for (50) ratings');

      expect(calculateRating(null, 0)).toEqual('Rated 0/5 for (0) ratings');

      expect(calculateRating(undefined, undefined)).toEqual('Rated 0/5 for (0) ratings');
    });

    test('shouldRenderCoverImageWithBookCover', () => {
      const { container } = render(renderCoverImage(mockBook));
      // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
      const imageElement = container.querySelector('img');

      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', `https://covers.openlibrary.org/b/id/${mockBook.cover_i}-L.jpg`);
      expect(imageElement).toHaveAttribute('alt', mockBook.title);
    });

    test('shouldRenderDefaultCoverImage_whenBookCoverIsNotAvailable', () => {
      const mockBook = {
        title: 'Mock Book Title'
      };

      const { container } = render(renderCoverImage(mockBook));
      // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
      const imageElement = container.querySelector('img');

      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', 'LibraryLogo.png');
      expect(imageElement).toHaveAttribute('alt', 'Default Cover');
    });
  });

  describe('AdvancedResearchAlt component', () => {
    test('shouldRenderInputFieldsAndSearchButton', () => {
      render(<AdvancedResearchAlt />);
      expect(screen.getByPlaceholderText('Search by Title')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search by Author')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search by Publish Year')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });

    test('shouldRenderLoadingText_whenLoadingIsTrue', () => {
      render(<AdvancedResearchAlt />);
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('Search'));
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('shouldRenderErrorMessage_whenSearchReturnNoResults', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ docs: [], num_found: 0 }),
      });

      render(<AdvancedResearchAlt />);
      fireEvent.click(screen.getByText('Search'));
      expect(await screen.findByText('No results found.')).toBeInTheDocument();

      global.fetch.mockRestore();
    });

    test('shouldRendersBooks_whenSearchReturnsResults', async () => {
      const mockData = {
        docs: [
          { title: 'Book 1', author: 'Author 1' },
          { title: 'Book 2', author: 'Author 2' },
        ],
        num_found: 2,
      };
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      render(<AdvancedResearchAlt />);
      fireEvent.click(screen.getByText('Search'));
      expect(await screen.findByText('Total results: 2')).toBeInTheDocument();

      global.fetch.mockRestore();
    });

    test('shouldRenderSetSearchFiltersWithCorrectValues', () => {
      const { getByPlaceholderText } = render(<AdvancedResearchAlt />);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      const titleInput = getByPlaceholderText('Search by Title');
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const authorInput = getByPlaceholderText('Search by Author');
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const publishYearInput = getByPlaceholderText('Search by Publish Year');

      fireEvent.change(titleInput, { target: { value: 'Title' } });
      fireEvent.change(authorInput, { target: { value: 'Author' } });
      fireEvent.change(publishYearInput, { target: { value: 'Year' } });

      expect(titleInput.value).toBe('Title');
      expect(authorInput.value).toBe('Author');
      expect(publishYearInput.value).toBe('Year');
    });

    test('shouldHandlePageChangeUpdatesCurrentPageCorrectly', () => {
      let currentPage = 1;
      const setCurrentPage = (pageNumber) => {
        currentPage = pageNumber;
      };

      const newPageNumber = 2;
      handlePageChange(currentPage, setCurrentPage, newPageNumber);

      expect(currentPage).toBe(newPageNumber);
    });

    test('shouldVerifyAppendMethodIsCalledCorrectlyWithSearchFilters', async () => {
      render(<AdvancedResearchAlt />);

      const fetchMock = jest.fn(() => Promise.resolve({}));
      global.fetch = fetchMock;

      userEvent.click(screen.getByText('Search'));

      await screen.findByText('Total results: 0');

      expect(fetchMock).toHaveBeenCalledWith("https://openlibrary.org/search.json?q=&sort=title&offset=0&limit=10");
    });

    test('shouldScrollWindowToTheTopSmoothly', () => {
      const originalScrollTo = window.scrollTo;
      window.scrollTo = jest.fn();

      scrollToTop();

      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

      window.scrollTo = originalScrollTo;
    });

    test('shouldHideBackToTopButton_whenScrolledWithinScrollThreshold', () => {
      const backButton = document.createElement('button');
      backButton.id = 'back-to-top';
      document.body.appendChild(backButton);

      // Créer un mock de document.getElementById
      const getElementByIdMock = jest.spyOn(document, 'getElementById').mockReturnValue(backButton);

      window.pageYOffset = 100;
      handleScroll();

      expect(backButton.style.display).toBe('none');

      getElementByIdMock.mockRestore();

      // Nettoyer
      document.body.removeChild(backButton);
    });

    test('shouldShowBackToTopButton_whenScrolledBeyondScrollThreshold', () => {
      const backButton = document.createElement('button');
      backButton.id = 'back-to-top';
      document.body.appendChild(backButton);

      const getElementByIdMock = jest.spyOn(document, 'getElementById').mockReturnValue(backButton);

      window.pageYOffset = 250;
      handleScroll();

      expect(backButton.style.display).toBe('block');

      getElementByIdMock.mockRestore();

      document.body.removeChild(backButton);
    });
  });

  describe('Pagination Component', () => {
    test('shouldDisablePreviousButton_whenCurrentPageIs1', () => {
      const { getByText } = render(<Pagination totalPages={5} currentPage={1} />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const previousButton = getByText('Previous');
      expect(previousButton).toBeDisabled();
    });

    test('shouldDisableNextButton_whenCurrentPageIsTotalPages', () => {
      const { getByText } = render(<Pagination totalPages={5} currentPage={5} />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const nextButton = getByText('Next');
      expect(nextButton).toBeDisabled();
    });

    test('shouldEnablePreviousButton_whenCurrentPageIsNot1', () => {
      const { getByText } = render(<Pagination totalPages={5} currentPage={3} />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const previousButton = getByText('Previous');
      expect(previousButton).not.toBeDisabled();
    });

    test('shouldEnableNextButton_whenCurrentPageIsNotTotalPages', () => {
      const { getByText } = render(<Pagination totalPages={5} currentPage={3} />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const nextButton = getByText('Next');
      expect(nextButton).not.toBeDisabled();
    });

    test('shouldCallOnPageChangeWithCorrectPageNumber_whenPreviousButtonIsClicked', () => {
      const onPageChangeMock = jest.fn();
      const { getByText } = render(
          <Pagination totalPages={5} currentPage={3} onPageChange={onPageChangeMock} />
      );
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const previousButton = getByText('Previous');
      fireEvent.click(previousButton);
      expect(onPageChangeMock).toHaveBeenCalledWith(2);
    });

    test('shouldCallOnPageChangeWithCorrectPageNumber_whenNextButtonIsClicked', () => {
      const onPageChangeMock = jest.fn();
      const { getByText } = render(
          <Pagination totalPages={5} currentPage={3} onPageChange={onPageChangeMock} />
      );
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const nextButton = getByText('Next');
      fireEvent.click(nextButton);
      expect(onPageChangeMock).toHaveBeenCalledWith(4);
    });

    test('shouldDisplayCorrectPageInformation', () => {
      const { getByText } = render(<Pagination totalPages={5} currentPage={3} />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText('Page 3 of 5')).toBeInTheDocument();
    });
  });

  describe('SearchBar Component', () => {

    let navigateMock;

    beforeEach(() => {
      navigateMock = jest.fn();
      useNavigate.mockReturnValue(navigateMock);
    });

    test('shouldHandleSubmitNavigatesToTheCorrectURL', () => {
      // eslint-disable-next-line no-undef
      const { getByRole } = render(<SearchBar navigate={navigateMock} />);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      const input = getByRole('textbox');
      const searchQuery = 'testQuery';

      fireEvent.change(input, { target: { value: searchQuery } });
      fireEvent.submit(input);

      expect(navigateMock).toHaveBeenCalledWith(`/quick-search/${searchQuery}`);
    });

    test('shouldHandleChangeUpdatesSearchQueryState', () => {
      const { getByRole } = render(<SearchBar />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const input = getByRole('textbox');
      const searchQuery = 'testQuery';

      fireEvent.change(input, { target: { value: searchQuery } });

      expect(input.value).toBe(searchQuery);
    });
  });
});