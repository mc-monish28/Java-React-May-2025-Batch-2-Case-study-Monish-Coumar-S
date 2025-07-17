package com.hexaware.cozyhavenstay.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cozyhavenstay.dto.LoginRequest;
import com.hexaware.cozyhavenstay.dto.LoginResponse;
import com.hexaware.cozyhavenstay.entity.Hotel;
import com.hexaware.cozyhavenstay.entity.Reservation;
import com.hexaware.cozyhavenstay.entity.Room;
import com.hexaware.cozyhavenstay.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    
    // Get all hotels (CUSTOMER only)
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/hotels")
    public ResponseEntity<List<Hotel>> getAllHotels() {
        List<Hotel> hotels = userService.getAllHotels();
        return new ResponseEntity<>(hotels, HttpStatus.OK);
    }
    
    // Search Hotels
    @GetMapping("/hotels/search/location")
    public ResponseEntity<List<Hotel>> searchHotelsByLocation(@RequestParam String city) {
        List<Hotel> hotels = userService.searchHotelsByLocation(city);
        return new ResponseEntity<>(hotels, HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/hotels/search/name")
    public ResponseEntity<List<Hotel>> searchHotelsByName(@RequestParam String name) {
        List<Hotel> hotels = userService.searchHotelsByName(name);
        return new ResponseEntity<>(hotels, HttpStatus.OK);
    }
    
    @GetMapping("/hotels/{hotelId}")
    public ResponseEntity<?> getHotelById(@PathVariable Long hotelId) {
        try {
            Hotel hotel = userService.getHotelById(hotelId);
            return new ResponseEntity<>(hotel, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    // Fetch all available rooms in a hotel
    @GetMapping("/hotels/{hotelId}/rooms")
    public ResponseEntity<List<Room>> getAvailableRoomsByHotel(@PathVariable Long hotelId) {
        List<Room> rooms = userService.getAvailableRoomsByHotel(hotelId);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }
    
    // Make Reservation
    @PostMapping("/reservations")
    public ResponseEntity<?> makeReservation(
            @RequestParam Long roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {
        try {
            Reservation reservation = userService.makeReservation(roomId, checkInDate, checkOutDate);
            return new ResponseEntity<>(reservation, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // Process Payment
    @PutMapping("/reservations/{reservationId}/payment")
    public ResponseEntity<?> processPayment(@PathVariable Long reservationId) {
        try {
            Reservation reservation = userService.processPayment(reservationId);
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // Cancel Reservation
    @PutMapping("/reservations/{reservationId}/cancel")
    public ResponseEntity<?> cancelReservation(@PathVariable Long reservationId) {
        try {
            Reservation reservation = userService.cancelReservation(reservationId);
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // View Reservation History
    @GetMapping("/reservations/history")
    public ResponseEntity<?> getReservationHistory() {
        try {
            List<Reservation> reservations = userService.getReservationHistory();
            return new ResponseEntity<>(reservations, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
} 