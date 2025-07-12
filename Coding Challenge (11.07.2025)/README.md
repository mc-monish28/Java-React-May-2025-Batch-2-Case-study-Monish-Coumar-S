# Book Manager Frontend

A modern, responsive book management application built with React and Bootstrap. This application provides a complete CRUD interface for managing books with user authentication.

## Features

- 🔐 **User Authentication**: Login and registration with JWT token support
- 📚 **Book Management**: Complete CRUD operations for books
- 🔍 **Search Functionality**: Search books by title, author, or ISBN
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful interface built with Bootstrap 5
- ⚡ **Real-time Feedback**: Toast notifications for user actions

## API Endpoints

The application connects to the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create a new book
- `PUT /api/books/{isbn}` - Update a book
- `DELETE /api/books/{isbn}` - Delete a book

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm start
   ```

3. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - The application will automatically redirect to the login page

## Usage

### Authentication
1. **Register**: Create a new account with username and password
2. **Login**: Sign in with your credentials
3. **Logout**: Click the logout button in the navigation bar

### Book Management
1. **View Books**: All books are displayed in a responsive grid
2. **Add Book**: Click "Add New Book" to create a new book entry
3. **Edit Book**: Click the "Edit" button on any book card
4. **Delete Book**: Click the "Delete" button to remove a book
5. **Search**: Use the search bar to filter books by title, author, or ISBN

## Technology Stack

- **React 19** - Frontend framework
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - UI framework and components
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Bootstrap Icons** - Icon library

## Project Structure

```
src/
├── components/
│   ├── Login.jsx          # Login page component
│   ├── Register.jsx       # Registration page component
│   ├── BookManager.jsx    # Main book management component
│   ├── BookModal.jsx      # Modal for adding/editing books
│   └── ProtectedRoute.jsx # Route protection component
├── App.jsx                # Main application component
├── App.css               # Custom styles
└── index.jsx             # Application entry point
```

## API Configuration

The application expects the backend API to be running on `http://localhost:8080`. Make sure your backend server is running and accessible before using the application.

## Authentication Flow

1. User logs in or registers
2. JWT token is stored in localStorage
3. Token is automatically included in all API requests as Bearer token
4. Protected routes check for token presence
5. Unauthorized requests redirect to login page

## Development

- The application uses React 19 with modern hooks
- Bootstrap 5 provides responsive design and components
- All API calls include proper error handling
- Toast notifications provide user feedback
- Form validation ensures data integrity

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

This project is open source and available under the MIT License.
