<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Cozy Haven Stay</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .welcome-section {
            background-color: #f8f9fa;
            padding: 2rem 0;
            margin-bottom: 2rem;
        }
        .hotel-card {
            height: 100%;
            transition: transform 0.2s;
        }
        .hotel-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .amenities-list {
            list-style: none;
            padding-left: 0;
        }
        .amenities-list li {
            display: inline-block;
            background-color: #e9ecef;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
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
                        <a class="nav-link active" href="/user/dashboard">Dashboard</a>
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
            <h1>Welcome, ${user.username}!</h1>
            <p class="lead">Explore our selection of hotels and find your perfect stay.</p>
        </div>
    </div>

    <div class="container">
        <div class="row mb-4">
            <div class="col-md-6">
                <form action="/hotel/search" method="get" class="d-flex">
                    <input type="text" name="location" class="form-control me-2" placeholder="Search by location...">
                    <input type="number" name="rating" class="form-control me-2" placeholder="Min rating" step="0.1" min="0" max="5">
                    <button type="submit" class="btn btn-primary">Search</button>
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
                            <a href="/hotel/view/${hotel.id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 