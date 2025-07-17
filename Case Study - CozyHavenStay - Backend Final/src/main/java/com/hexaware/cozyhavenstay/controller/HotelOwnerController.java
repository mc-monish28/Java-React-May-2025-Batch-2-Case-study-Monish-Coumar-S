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
import com.hexaware.cozyhavenstay.dto.HotelDTO;
import com.hexaware.cozyhavenstay.dto.RoomDTO;
import com.hexaware.cozyhavenstay.entity.Booking;
import com.hexaware.cozyhavenstay.entity.Hotel;
import com.hexaware.cozyhavenstay.entity.Room;
import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.service.BookingService;
import com.hexaware.cozyhavenstay.service.HotelService;
import com.hexaware.cozyhavenstay.service.RoomService;
import com.hexaware.cozyhavenstay.service.UserService;

@RestController
@RequestMapping("/api/hotel-owner")
@PreAuthorize("hasRole('HOTEL_OWNER')")
public class HotelOwnerController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private HotelService hotelService;
    
    @Autowired
    private RoomService roomService;
    
    @Autowired
    private BookingService bookingService;
    
    // Login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = userService.login(loginRequest);
        return new ResponseEntity<>(response, 
            response.isSuccess() ? HttpStatus.OK : HttpStatus.UNAUTHORIZED);
    }
    
    // Logout
    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout() {
        LogoutResponse response = userService.logout();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    // Delete account
    @DeleteMapping("/delete-account/{userId}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>("Account deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // Hotel Management
    
    @PostMapping("/hotels")
    public ResponseEntity<?> createHotel(@RequestBody HotelDTO hotelDTO) {
        try {
            User owner = userService.getCurrentUser();
            Hotel hotel = hotelService.createHotel(hotelDTO, owner);
            return new ResponseEntity<>(hotel, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/hotels")
    public ResponseEntity<?> getMyHotels() {
        try {
            User owner = userService.getCurrentUser();
            List<Hotel> hotels = hotelService.getHotelsByOwner(owner);
            return new ResponseEntity<>(hotels, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/hotels/{hotelId}")
    public ResponseEntity<?> updateHotel(
            @PathVariable Long hotelId,
            @RequestBody HotelDTO hotelDTO) {
        try {
            User owner = userService.getCurrentUser();
            Hotel hotel = hotelService.updateHotel(hotelId, hotelDTO, owner);
            return new ResponseEntity<>(hotel, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @DeleteMapping("/hotels/{hotelId}")
    public ResponseEntity<?> deleteHotel(@PathVariable Long hotelId) {
        try {
            User owner = userService.getCurrentUser();
            hotelService.deleteHotel(hotelId, owner);
            return new ResponseEntity<>("Hotel deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // Room Management
    
    @PostMapping("/hotels/{hotelId}/rooms")
    public ResponseEntity<?> createRoom(
            @PathVariable Long hotelId,
            @RequestBody RoomDTO roomDTO) {
        try {
            User owner = userService.getCurrentUser();
            Room room = roomService.createRoom(hotelId, roomDTO, owner);
            return new ResponseEntity<>(room, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN', 'HOTEL_OWNER')")
    @GetMapping("/hotels/{hotelId}/rooms")
    public ResponseEntity<?> getRooms(@PathVariable Long hotelId) {
        try {
            User owner = userService.getCurrentUser();
            List<Room> rooms = roomService.getRoomsByHotel(hotelId, owner);
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/rooms/{roomId}")
    public ResponseEntity<?> updateRoom(
            @PathVariable Long roomId,
            @RequestBody RoomDTO roomDTO) {
        try {
            User owner = userService.getCurrentUser();
            Room room = roomService.updateRoom(roomId, roomDTO, owner);
            return new ResponseEntity<>(room, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @DeleteMapping("/rooms/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long roomId) {
        try {
            User owner = userService.getCurrentUser();
            roomService.deleteRoom(roomId, owner);
            return new ResponseEntity<>("Room deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    // Booking Management
    
    @GetMapping("/rooms/{roomId}/bookings")
    public ResponseEntity<?> getRoomBookings(@PathVariable Long roomId) {
        try {
            User owner = userService.getCurrentUser();
            List<Booking> bookings = bookingService.getBookingsByRoom(roomId, owner);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/rooms/{roomId}/active-bookings")
    public ResponseEntity<?> getActiveRoomBookings(@PathVariable Long roomId) {
        try {
            User owner = userService.getCurrentUser();
            List<Booking> bookings = bookingService.getActiveBookingsByRoom(roomId, owner);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/bookings/{bookingId}/status/{status}")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable Long bookingId,
            @PathVariable String status) {
        try {
            User owner = userService.getCurrentUser();
            Booking booking = bookingService.updateBookingStatus(bookingId, status, owner);
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> getAllBookingsForOwner() {
        try {
            User owner = userService.getCurrentUser();
            List<Booking> bookings = bookingService.getBookingsByOwner(owner);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/hotels/{hotelId}/bookings")
    public ResponseEntity<?> getBookingsByHotel(@PathVariable Long hotelId) {
        try {
            User owner = userService.getCurrentUser();
            List<Booking> bookings = bookingService.getBookingsByHotel(hotelId, owner);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
} 