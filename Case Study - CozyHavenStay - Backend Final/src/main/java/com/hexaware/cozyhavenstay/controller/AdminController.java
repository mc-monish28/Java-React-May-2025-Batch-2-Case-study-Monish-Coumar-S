package com.hexaware.cozyhavenstay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cozyhavenstay.dto.LoginRequest;
import com.hexaware.cozyhavenstay.dto.LoginResponse;
import com.hexaware.cozyhavenstay.dto.LogoutResponse;
import com.hexaware.cozyhavenstay.entity.Hotel;
import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.service.AdminService;
import com.hexaware.cozyhavenstay.service.UserService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private AdminService adminService;
    
    // ========== AUTHENTICATION ==========
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = userService.login(loginRequest);
        return new ResponseEntity<>(response, 
            response.isSuccess() ? HttpStatus.OK : HttpStatus.UNAUTHORIZED);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout() {
        LogoutResponse response = userService.logout();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    // ========== HOTEL OWNER MANAGEMENT ==========
    
    // 1. View all Hotel Owners
    @GetMapping("/hotel-owners")
    public ResponseEntity<?> getAllHotelOwners() {
        try {
            List<User> hotelOwners = adminService.getAllHotelOwners();
            return new ResponseEntity<>(hotelOwners, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // 2. Edit Hotel Owner Info
    @PutMapping("/hotel-owners/{ownerId}")
    public ResponseEntity<?> updateHotelOwner(@PathVariable Long ownerId, @RequestBody User updatedOwner) {
        try {
            User hotelOwner = adminService.updateHotelOwner(ownerId, updatedOwner);
            return new ResponseEntity<>(hotelOwner, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // 3. View Hotels of the Hotel Owners
    @GetMapping("/hotel-owners/{ownerId}/hotels")
    public ResponseEntity<?> getHotelsByOwner(@PathVariable Long ownerId) {
        try {
            List<Hotel> hotels = adminService.getHotelsByOwner(ownerId);
            return new ResponseEntity<>(hotels, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // 4. View All Hotels
    @GetMapping("/hotels")
    public ResponseEntity<?> getAllHotels() {
        try {
            List<Hotel> hotels = adminService.getAllHotels();
            return new ResponseEntity<>(hotels, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // 5. Delete Hotel Owner
    @DeleteMapping("/hotel-owners/{ownerId}")
    public ResponseEntity<?> deleteHotelOwner(@PathVariable Long ownerId) {
        try {
            adminService.deleteHotelOwner(ownerId);
            return new ResponseEntity<>("Hotel owner deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // ========== ADDITIONAL ADMIN FUNCTIONALITIES ==========
    
    // Get Hotel Owner by ID
    @GetMapping("/hotel-owners/{ownerId}")
    public ResponseEntity<?> getHotelOwnerById(@PathVariable Long ownerId) {
        try {
            User hotelOwner = adminService.getHotelOwnerById(ownerId);
            return new ResponseEntity<>(hotelOwner, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    // Get Hotel by ID
    @GetMapping("/hotels/{hotelId}")
    public ResponseEntity<?> getHotelById(@PathVariable Long hotelId) {
        try {
            Hotel hotel = adminService.getHotelById(hotelId);
            return new ResponseEntity<>(hotel, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    // Delete Hotel
    @DeleteMapping("/hotels/{hotelId}")
    public ResponseEntity<?> deleteHotel(@PathVariable Long hotelId) {
        try {
            adminService.deleteHotel(hotelId);
            return new ResponseEntity<>("Hotel deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // Get statistics
    @GetMapping("/statistics")
    public ResponseEntity<?> getAdminStatistics() {
        try {
            return new ResponseEntity<>(adminService.getAdminStatistics(), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
} 