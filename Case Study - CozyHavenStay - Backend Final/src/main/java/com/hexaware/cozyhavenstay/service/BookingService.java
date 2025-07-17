package com.hexaware.cozyhavenstay.service;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhavenstay.entity.Booking;
import com.hexaware.cozyhavenstay.entity.Room;
import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.entity.Hotel;
import com.hexaware.cozyhavenstay.enums.UserRole;
import com.hexaware.cozyhavenstay.repository.BookingRepository;
import com.hexaware.cozyhavenstay.repository.RoomRepository;
import com.hexaware.cozyhavenstay.service.HotelService;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private HotelService hotelService;
    
    // Get bookings for a room
    public List<Booking> getBookingsByRoom(Long roomId, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can view room bookings");
        }
        
        Room room = roomRepository.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Room not found"));
            
        if (!room.getHotel().getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only view bookings for your own rooms");
        }
        
        return bookingRepository.findByRoom(room);
    }
    
    // Get active bookings for a room
    public List<Booking> getActiveBookingsByRoom(Long roomId, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can view room bookings");
        }
        
        Room room = roomRepository.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Room not found"));
            
        if (!room.getHotel().getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only view bookings for your own rooms");
        }
        
        return bookingRepository.findByRoomAndIsActiveTrue(room);
    }
    
    // Get booking by ID
    public Booking getBookingById(Long bookingId, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can view bookings");
        }
        
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
            
        if (!booking.getRoom().getHotel().getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only view your own bookings");
        }
        
        return booking;
    }
    
    // Update booking status
    public Booking updateBookingStatus(Long bookingId, String status, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can update booking status");
        }
        
        Booking booking = getBookingById(bookingId, owner);
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
    
    // Check if room is available for given dates
    public boolean isRoomAvailable(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Room not found"));
        List<Booking> overlappingBookings = bookingRepository.findOverlappingBookings(room, checkIn, checkOut);
        return overlappingBookings.isEmpty();
    }

    // Get all bookings for all hotels owned by a hotel owner
    public List<Booking> getBookingsByOwner(User owner) {
        List<Hotel> hotels = hotelService.getHotelsByOwner(owner);
        List<Booking> allBookings = new ArrayList<>();
        for (Hotel hotel : hotels) {
            for (Room room : hotel.getRooms()) {
                allBookings.addAll(bookingRepository.findByRoom(room));
            }
        }
        return allBookings;
    }

    // Get all bookings for a specific hotel owned by the hotel owner
    public List<Booking> getBookingsByHotel(Long hotelId, User owner) {
        Hotel hotel = hotelService.getHotelById(hotelId);
        if (!hotel.getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only view bookings for your own hotels");
        }
        List<Booking> allBookings = new ArrayList<>();
        for (Room room : hotel.getRooms()) {
            allBookings.addAll(bookingRepository.findByRoom(room));
        }
        return allBookings;
    }
} 