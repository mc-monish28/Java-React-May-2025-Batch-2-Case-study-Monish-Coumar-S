<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${hotel.name} - Cozy Haven Stay</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .hotel-header {
            background-color: #f8f9fa;
            padding: 40px 0;
            margin-bottom: 30px;
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
        .room-card {
            transition: transform 0.2s;
        }
        .room-card:hover {
            transform: translateY(-5px);
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
                        <a class="nav-link" href="/hotel/list">Hotels</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <c:if test="${not empty sessionScope.user}">
                        <c:if test="${sessionScope.user.role == 'ADMIN'}">
                            <a href="/hotel/admin/edit/${hotel.id}" class="btn btn-warning me-2">Edit Hotel</a>
                            <a href="/room/admin/create/${hotel.id}" class="btn btn-success me-2">Add Room</a>
                        </c:if>
                        <a href="/user/logout" class="btn btn-outline-light">Logout</a>
                    </c:if>
                    <c:if test="${empty sessionScope.user}">
                        <a href="/user/login" class="btn btn-outline-light">Login</a>
                    </c:if>
                </div>
            </div>
        </div>
    </nav>

    <div class="hotel-header">
        <div class="container">
            <h1>${hotel.name}</h1>
            <p class="lead">${hotel.location}</p>
            <div class="d-flex align-items-center">
                <div class="me-3">
                    <strong>Rating:</strong> ${hotel.rating}/5
                </div>
                <div>
                    <strong>Amenities:</strong>
                    <ul class="amenities-list d-inline">
                        <c:forEach items="${hotel.amenities}" var="amenity">
                            <li>${amenity}</li>
                        </c:forEach>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <h2>About the Hotel</h2>
                <p>${hotel.description}</p>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12">
                <h2>Available Rooms</h2>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <c:forEach items="${hotel.rooms}" var="room">
                        <div class="col">
                            <div class="card h-100 room-card">
                                <div class="card-body">
                                    <h5 class="card-title">${room.type}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">Room ${room.roomNumber}</h6>
                                    <p class="card-text">${room.description}</p>
                                    <div class="mb-3">
                                        <strong>Price:</strong> $${room.price}/night
                                    </div>
                                    <div class="mb-3">
                                        <strong>Room Amenities:</strong>
                                        <ul class="amenities-list">
                                            <c:forEach items="${room.amenities}" var="amenity">
                                                <li>${amenity}</li>
                                            </c:forEach>
                                        </ul>
                                    </div>
                                    <c:if test="${sessionScope.user.role == 'ADMIN'}">
                                        <a href="/room/admin/edit/${room.id}" class="btn btn-warning">Edit</a>
                                        <a href="/room/admin/delete/${room.id}" class="btn btn-danger" 
                                           onclick="return confirm('Are you sure you want to delete this room?')">Delete</a>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 