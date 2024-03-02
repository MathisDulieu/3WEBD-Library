import { render, screen } from '@testing-library/react';
import App from '../App';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders a link to the Advanced Research page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Advanced Research/i);
  expect(linkElement).toBeInTheDocument();
});

test("navigation to the book details page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Advanced Research/i);
  expect(linkElement).toBeInTheDocument();
  linkElement.click();
  const bookDetailsLink = screen.getByText(/Book Details/i);
  expect(bookDetailsLink).toBeInTheDocument();
});

test("Do a quicksearch", () => {
  render(<App />);
  const linkElement = screen.getByText(/Advanced Research/i);
  expect(linkElement).toBeInTheDocument();
  linkElement.click();
  const quickSearchInput = screen.getByPlaceholderText(/Quick Search/i);
  expect(quickSearchInput).toBeInTheDocument();
  quickSearchInput.value = "Harry Potter";
  quickSearchInput.dispatchEvent(new Event('input'));
  const bookCard = screen.getByText(/Harry Potter/i);
  expect(bookCard).toBeInTheDocument();
});

test("Do a quicksearch with a wrong title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Advanced Research/i);
  expect(linkElement).toBeInTheDocument();
  linkElement.click();
  const quickSearchInput = screen.getByPlaceholderText(/Quick Search/i);
  expect(quickSearchInput).toBeInTheDocument();
  quickSearchInput.value = "Harry Potter";
  quickSearchInput.dispatchEvent(new Event('input'));
  const bookCard = screen.queryByText(/Harry Potter/i);
  expect(bookCard).toBeNull();
});

test("Do a research with no results", () => {
  render(<App />);
  const linkElement = screen.getByText(/Advanced Research/i);
  expect(linkElement).toBeInTheDocument();
  linkElement.click();
  const quickSearchInput = screen.getByPlaceholderText(/Quick Search/i);
  expect(quickSearchInput).toBeInTheDocument();
  quickSearchInput.value = "qfnqefkjfqjjjgojegjojoerjgjqjerjgejjpjrjgopjpsrogjeojgj";
  quickSearchInput.dispatchEvent(new Event('input'));
  const bookCard = screen.queryByText(/Harry Potter/i);
  expect(bookCard).toBeNull();
});

test("Modify the url to non existent page", () => {
  render(<App />);
  window.history.pushState({}, 'Test page', '/non-existent-page');
  const notFound = screen.getByText(/404/i);
  expect(notFound).toBeInTheDocument();
});
