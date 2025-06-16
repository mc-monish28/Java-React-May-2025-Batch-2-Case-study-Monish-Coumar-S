<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${room.id == null ? 'Add' : 'Edit'} Room - Cozy Haven Stay</title>
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
            <h2 class="mb-4">${room.id == null ? 'Add New Room' : 'Edit Room'}</h2>
            
            <form action="${room.id == null ? '/room/admin/create/'.concat(hotelId) : '/room/admin/edit/'.concat(room.id)}" method="post">
                <div class="mb-3">
                    <label for="roomNumber" class="form-label">Room Number</label>
                    <input type="text" class="form-control" id="roomNumber" name="roomNumber" value="${room.roomNumber}" required>
                </div>
                
                <div class="mb-3">
                    <label for="type" class="form-label">Room Type</label>
                    <select class="form-select" id="type" name="type" required>
                        <option value="Standard" ${room.type == 'Standard' ? 'selected' : ''}>Standard</option>
                        <option value="Deluxe" ${room.type == 'Deluxe' ? 'selected' : ''}>Deluxe</option>
                        <option value="Suite" ${room.type == 'Suite' ? 'selected' : ''}>Suite</option>
                        <option value="Executive" ${room.type == 'Executive' ? 'selected' : ''}>Executive</option>
                        <option value="Presidential" ${room.type == 'Presidential' ? 'selected' : ''}>Presidential</option>
                    </select>
                </div>
                
                <div class="mb-3">
                    <label for="price" class="form-label">Price per Night ($)</label>
                    <input type="number" class="form-control" id="price" name="price" value="${room.price}" 
                           step="0.01" min="0" required>
                </div>
                
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" name="description" rows="3" required>${room.description}</textarea>
                </div>
                
                <div class="mb-3">
                    <label class="form-label">Room Amenities</label>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="TV" 
                                       ${room.amenities.contains('TV') ? 'checked' : ''}>
                                <label class="form-check-label">TV</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="Mini Bar" 
                                       ${room.amenities.contains('Mini Bar') ? 'checked' : ''}>
                                <label class="form-check-label">Mini Bar</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="Air Conditioning" 
                                       ${room.amenities.contains('Air Conditioning') ? 'checked' : ''}>
                                <label class="form-check-label">Air Conditioning</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="Safe" 
                                       ${room.amenities.contains('Safe') ? 'checked' : ''}>
                                <label class="form-check-label">Safe</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="Balcony" 
                                       ${room.amenities.contains('Balcony') ? 'checked' : ''}>
                                <label class="form-check-label">Balcony</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="amenities" value="Ocean View" 
                                       ${room.amenities.contains('Ocean View') ? 'checked' : ''}>
                                <label class="form-check-label">Ocean View</label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">${room.id == null ? 'Create Room' : 'Update Room'}</button>
                    <a href="/hotel/view/${hotelId}" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 