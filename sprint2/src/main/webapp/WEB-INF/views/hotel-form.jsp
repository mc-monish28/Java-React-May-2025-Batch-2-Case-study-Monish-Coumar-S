<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${hotel.id == null ? 'Add' : 'Edit'} Hotel - Cozy Haven Stay</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .form-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
                    <a href="/user/logout" class="btn btn-outline-light">Logout</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="form-container">
            <h2 class="mb-4">${hotel.id == null ? 'Add New Hotel' : 'Edit Hotel'}</h2>
            
            <form action="${hotel.id == null ? '/hotel/admin/create' : '/hotel/admin/edit/'.concat(hotel.id)}" method="post">
                <div class="mb-3">
                    <label for="name" class="form-label">Hotel Name</label>
                    <input type="text" class="form-control" id="name" name="name" value="${hotel.name}" required>
                </div>
                
                <div class="mb-3">
                    <label for="location" class="form-label">Location</label>
                    <input type="text" class="form-control" id="location" name="location" value="${hotel.location}" required>
                </div>
                
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" name="description" rows="3" required>${hotel.description}</textarea>
                </div>
                
                <div class="mb-3">
                    <label for="rating" class="form-label">Rating (0-5)</label>
                    <input type="number" class="form-control" id="rating" name="rating" value="${hotel.rating}" 
                           step="0.1" min="0" max="5" required>
                </div>
                
                <div class="mb-3">
                    <label class="form-label">Amenities</label>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="WiFi" 
                                       ${hotel.amenities.contains('WiFi') ? 'checked' : ''}>
                                <label class="form-check-label">WiFi</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="Pool" 
                                       ${hotel.amenities.contains('Pool') ? 'checked' : ''}>
                                <label class="form-check-label">Pool</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="Gym" 
                                       ${hotel.amenities.contains('Gym') ? 'checked' : ''}>
                                <label class="form-check-label">Gym</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="Restaurant" 
                                       ${hotel.amenities.contains('Restaurant') ? 'checked' : ''}>
                                <label class="form-check-label">Restaurant</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="Spa" 
                                       ${hotel.amenities.contains('Spa') ? 'checked' : ''}>
                                <label class="form-check-label">Spa</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="Parking" 
                                       ${hotel.amenities.contains('Parking') ? 'checked' : ''}>
                                <label class="form-check-label">Parking</label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">${hotel.id == null ? 'Create Hotel' : 'Update Hotel'}</button>
                    <a href="/hotel/list" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 