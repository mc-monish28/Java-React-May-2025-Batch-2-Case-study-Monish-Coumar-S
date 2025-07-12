import React, { useState, useEffect } from 'react';

const BookModal = ({ show, onClose, onSave, book }) => {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    publicationYear: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setFormData({
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        publicationYear: book.publicationYear.toString()
      });
    } else {
      setFormData({
        isbn: '',
        title: '',
        author: '',
        publicationYear: ''
      });
    }
    setErrors({});
  }, [book, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.publicationYear.trim()) {
      newErrors.publicationYear = 'Publication year is required';
    } else {
      const year = parseInt(formData.publicationYear);
      if (isNaN(year) || year < 1800 || year > new Date().getFullYear() + 1) {
        newErrors.publicationYear = 'Please enter a valid year';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        isbn: formData.isbn.trim(),
        title: formData.title.trim(),
        author: formData.author.trim(),
        publicationYear: parseInt(formData.publicationYear)
      });
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {book ? 'Edit Book' : 'Add New Book'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="isbn" className="form-label">ISBN *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
                      id="isbn"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      placeholder="Enter ISBN"
                    />
                    {errors.isbn && (
                      <div className="invalid-feedback">
                        {errors.isbn}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="publicationYear" className="form-label">Publication Year *</label>
                    <input
                      type="number"
                      className={`form-control ${errors.publicationYear ? 'is-invalid' : ''}`}
                      id="publicationYear"
                      name="publicationYear"
                      value={formData.publicationYear}
                      onChange={handleChange}
                      placeholder="Enter publication year"
                      min="1800"
                      max={new Date().getFullYear() + 1}
                    />
                    {errors.publicationYear && (
                      <div className="invalid-feedback">
                        {errors.publicationYear}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title *</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                />
                {errors.title && (
                  <div className="invalid-feedback">
                    {errors.title}
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                <label htmlFor="author" className="form-label">Author *</label>
                <input
                  type="text"
                  className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <div className="invalid-feedback">
                    {errors.author}
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {book ? 'Update Book' : 'Add Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookModal; 