import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import BookModal from './BookModal';

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBooks(response.data);
    } catch (error) {
      toast.error('Failed to fetch books');
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setShowModal(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };

  const handleDeleteBook = async (isbn) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:8080/api/books/${isbn}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        toast.success('Book deleted successfully');
        fetchBooks();
      } catch (error) {
        toast.error('Failed to delete book');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingBook(null);
  };

  const handleModalSave = async (bookData) => {
    console.log('Sending book data:', bookData);
    console.log('Token:', token);
    
    try {
      if (editingBook) {
        console.log('Updating book with ISBN:', editingBook.isbn);
        await axios.put(`http://localhost:8080/api/books/${editingBook.isbn}`, bookData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        toast.success('Book updated successfully');
      } else {
        console.log('Creating new book');
        await axios.post('http://localhost:8080/api/books', bookData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        toast.success('Book added successfully');
      }
      fetchBooks();
      handleModalClose();
    } catch (error) {
      console.error('Save book error:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Book data:', bookData);
      toast.error(error.response?.data?.message || `Failed to save book: ${error.message}`);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <span className="navbar-brand fw-bold">BOOK MANAGER</span>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text me-3">
              Welcome, {username}!
            </span>
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {/* Search and Add Section */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search books by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <button
              className="btn btn-primary"
              onClick={handleAddBook}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add New Book
            </button>
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-5">
            <div className="text-muted">
              <i className="bi bi-book display-1"></i>
              <h4 className="mt-3">No books found</h4>
              <p>Try adding a new book or adjusting your search.</p>
            </div>
          </div>
        ) : (
          <div className="row">
            {filteredBooks.map((book) => (
              <div key={book.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{book.title}</h5>
                    <p className="card-text text-muted mb-2">
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p className="card-text text-muted mb-2">
                      <strong>ISBN:</strong> {book.isbn}
                    </p>
                    <p className="card-text text-muted mb-3">
                      <strong>Year:</strong> {book.publicationYear}
                    </p>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm flex-fill"
                        onClick={() => handleEditBook(book)}
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm flex-fill"
                        onClick={() => handleDeleteBook(book.isbn)}
                      >
                        <i className="bi bi-trash me-1"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Book Count */}
        <div className="text-center mt-4">
          <small className="text-muted">
            Showing {filteredBooks.length} of {books.length} books
          </small>
        </div>
      </div>

      {/* Book Modal */}
      <BookModal
        show={showModal}
        onClose={handleModalClose}
        onSave={handleModalSave}
        book={editingBook}
      />
    </div>
  );
};

export default BookManager; 