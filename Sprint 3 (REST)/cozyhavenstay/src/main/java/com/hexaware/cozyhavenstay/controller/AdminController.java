package com.hexaware.cozyhavenstay.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.hexaware.cozyhavenstay.model.*;
import java.util.List;
import com.hexaware.cozyhavenstay.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    // Admin login
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> adminLogin(@RequestBody UserLoginRequest request) {
        UserLoginResponse response = adminService.adminLogin(request);
        if (response != null && response.getUserId() != null && "ADMIN".equalsIgnoreCase(response.getRole())) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }

    // Admin registration (only by admin)
    @PostMapping("/register")
    public ResponseEntity<User> adminRegister(@RequestBody UserRegistrationRequest request) {
        if (!"ADMIN".equalsIgnoreCase(request.getRole())) {
            return ResponseEntity.status(403).build();
        }
        User admin = adminService.adminRegister(request);
        return ResponseEntity.ok(admin);
    }

    // Hotel Owner registration (only by admin)
    @PostMapping("/owners/register")
    public ResponseEntity<User> registerHotelOwner(@RequestBody UserRegistrationRequest request) {
        if (!"OWNER".equalsIgnoreCase(request.getRole())) {
            return ResponseEntity.status(403).build();
        }
        User owner = adminService.registerHotelOwner(request);
        return ResponseEntity.ok(owner);
    }

    // Manage Hotel Owner Info (CRUD)
    @GetMapping("/owners")
    public ResponseEntity<List<User>> getAllOwners() {
        List<User> owners = adminService.getAllOwners();
        return ResponseEntity.ok(owners);
    }

    @GetMapping("/owners/{ownerId}")
    public ResponseEntity<User> getOwner(@PathVariable Long ownerId) {
        try {
            User owner = adminService.getOwner(ownerId);
            return ResponseEntity.ok(owner);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/owners/{ownerId}")
    public ResponseEntity<User> updateOwner(@PathVariable Long ownerId, @RequestBody UserRegistrationRequest request) {
        try {
            User owner = adminService.updateOwner(ownerId, request);
            return ResponseEntity.ok(owner);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/owners/{ownerId}")
    public ResponseEntity<?> deleteOwner(@PathVariable Long ownerId) {
        try {
            adminService.deleteOwner(ownerId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // User Management (CRUD)
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        try {
            User user = adminService.getUser(userId);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody UserRegistrationRequest request) {
        try {
            User user = adminService.updateUser(userId, request);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            adminService.deleteUser(userId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Manage Hotel Listings (CRUD)
    @GetMapping("/hotels")
    public ResponseEntity<List<Hotel>> getAllHotels() {
        List<Hotel> hotels = adminService.getAllHotels();
        return ResponseEntity.ok(hotels);
    }

    @PostMapping("/hotels")
    public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel) {
        Hotel created = adminService.createHotel(hotel);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/hotels/{hotelId}")
    public ResponseEntity<Hotel> getHotel(@PathVariable Long hotelId) {
        try {
            Hotel hotel = adminService.getHotel(hotelId);
            return ResponseEntity.ok(hotel);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/hotels/{hotelId}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long hotelId, @RequestBody Hotel hotel) {
        try {
            Hotel updated = adminService.updateHotel(hotelId, hotel);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/hotels/{hotelId}")
    public ResponseEntity<?> deleteHotel(@PathVariable Long hotelId) {
        adminService.deleteHotel(hotelId);
        return ResponseEntity.ok().build();
    }

    // Manage Bookings of all hotels
    @GetMapping("/bookings")
    public ResponseEntity<List<Reservation>> getAllBookings() {
        List<Reservation> bookings = adminService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<Reservation> getBooking(@PathVariable Long bookingId) {
        try {
            Reservation booking = adminService.getBooking(bookingId);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/bookings/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId) {
        adminService.deleteBooking(bookingId);
        return ResponseEntity.ok().build();
    }

    // Logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        adminService.logout();
        return ResponseEntity.ok().build();
    }

    // Delete admin account
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAdminAccount(@RequestParam Long adminId) {
        try {
            adminService.deleteAdminAccount(adminId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 