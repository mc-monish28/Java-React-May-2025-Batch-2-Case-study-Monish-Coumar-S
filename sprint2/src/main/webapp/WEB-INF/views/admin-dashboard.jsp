<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard - Cozy Haven Stay</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .welcome-section {
            background-color: #f8f9fa;
            padding: 40px 0;
            margin-bottom: 30px;
        }
        .hotel-card {
            transition: transform 0.2s;
        }
        .hotel-card:hover {
            transform: translateY(-5px);
        }
        .amenities-list {
            list-style: none;
            padding: 0;
        }
        .amenities-list li {
            display: inline-block;
            margin-right: 10px;
            background-color: #e9ecef;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
        }
        .admin-actions {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/hotel/list">Cozy Haven Stay</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="/admin/dashboard">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/hotel/list">Hotels</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <a href="/user/logout" class="btn btn-outline-light">Logout</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="welcome-section">
        <div class="container">
            <h1>Welcome, Admin ${user.username}!</h1>
            <p class="lead">Manage hotels and rooms from your dashboard.</p>
        </div>
    </div>

    <div class="container">
        <div class="row mb-4">
            <div class="col">
                <form action="/hotel/search" method="get" class="row g-3">
                    <div class="col-md-4">
                        <input type="text" class="form-control" name="location" placeholder="Search by location">
                    </div>
                    <div class="col-md-4">
                        <input type="number" class="form-control" name="rating" placeholder="Minimum rating" step="0.1" min="0" max="5">
                    </div>
                    <div class="col-md-4">
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
            <c:forEach items="${hotels}" var="hotel">
                <div class="col">
                    <div class="card h-100 hotel-card">
                        <div class="card-body">
                            <h5 class="card-title">${hotel.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${hotel.location}</h6>
                            <p class="card-text">${hotel.description}</p>
                            <div class="mb-3">
                                <strong>Rating:</strong> ${hotel.rating}/5
                            </div>
                            <div class="mb-3">
                                <strong>Amenities:</strong>
                                <ul class="amenities-list">
                                    <c:forEach items="${hotel.amenities}" var="amenity">
                                        <li>${amenity}</li>
                                    </c:forEach>
                                </ul>
                            </div>
                            <div class="btn-group" role="group">
                                <a href="/hotel/view/${hotel.id}" class="btn btn-primary">View Details</a>
                                <a href="/hotel/admin/edit/${hotel.id}" class="btn btn-warning">Edit</a>
                                <a href="/hotel/admin/delete/${hotel.id}" class="btn btn-danger" 
                                   onclick="return confirm('Are you sure you want to delete this hotel?')">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>

    <div class="admin-actions">
        <a href="/hotel/admin/create" class="btn btn-success btn-lg rounded-circle shadow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </a>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 