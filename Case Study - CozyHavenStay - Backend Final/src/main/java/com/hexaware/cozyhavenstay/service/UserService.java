package com.hexaware.cozyhavenstay.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhavenstay.dto.LoginRequest;
import com.hexaware.cozyhavenstay.dto.LoginResponse;
import com.hexaware.cozyhavenstay.dto.LogoutResponse;
import com.hexaware.cozyhavenstay.dto.UserDTO;
import com.hexaware.cozyhavenstay.entity.Booking;
import com.hexaware.cozyhavenstay.entity.Hotel;
import com.hexaware.cozyhavenstay.entity.Reservation;
import com.hexaware.cozyhavenstay.entity.Room;
import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.repository.BookingRepository;
import com.hexaware.cozyhavenstay.repository.HotelRepository;
import com.hexaware.cozyhavenstay.repository.ReservationRepository;
import com.hexaware.cozyhavenstay.repository.RoomRepository;
import com.hexaware.cozyhavenstay.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private HotelRepository hotelRepository;
    
    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    // User Login
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());
        
        if (user == null) {
            return new LoginResponse("User not found");
        }
        
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return new LoginResponse("Invalid password");
        }
        
        return new LoginResponse(user.getUserId(), user.getUsername(), user.getEmail());
    }
    
    public LogoutResponse logout() {
        SecurityContextHolder.clearContext();
        return new LogoutResponse("Logged out successfully");
    }
    
    // Get current user from SecurityContext
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No user is currently logged in");
        }
        
        String email = authentication.getName();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return user;
    }
    
    // Search hotels by location (city)
    public List<Hotel> searchHotelsByLocation(String city) {
        return hotelRepository.findByCityIgnoreCase(city);
    }
    
    // Search hotel by ID
    public Hotel getHotelById(Long hotelId) {
        return hotelRepository.findById(hotelId)
            .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));
    }
    
    // Search hotels by name
    public List<Hotel> searchHotelsByName(String name) {
        return hotelRepository.findByHotelNameContainingIgnoreCase(name);
    }
    
    // Get all hotels (for customers only)
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }
    
    // Make a reservation
    public Reservation makeReservation(Long roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        User currentUser = getCurrentUser();
        
        Room room = roomRepository.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Room not found"));
        
        // Simple validation
        if (checkInDate.isBefore(LocalDate.now())) {
            throw new RuntimeException("Check-in date cannot be in the past");
        }
        if (checkOutDate.isBefore(checkInDate)) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }
        
        // Create reservation
        Reservation reservation = new Reservation();
        reservation.setUser(currentUser);
        reservation.setRoom(room);
        reservation.setCheckInDate(checkInDate);
        reservation.setCheckOutDate(checkOutDate);
        reservation.setTotalPrice(room.getPricePerNight() * checkInDate.until(checkOutDate).getDays());
        reservation.setStatus("CONFIRMED");
        reservation.setPaymentStatus("PENDING");
        
        return reservationRepository.save(reservation);
    }
    
    // Process payment
    public Reservation processPayment(Long reservationId) {
        User currentUser = getCurrentUser();
        Reservation reservation = reservationRepository.findById(reservationId)
            .orElseThrow(() -> new RuntimeException("Reservation not found"));
            
        if (!reservation.getUser().equals(currentUser)) {
            throw new RuntimeException("Not authorized to process this payment");
        }
        
        // In a real app, integrate with payment gateway
        // For now, just mark as paid
        reservation.setPaymentStatus("PAID");
        Reservation savedReservation = reservationRepository.save(reservation);
        
        // Create Booking if not already exists for this reservation (by user, room, and dates)
        boolean bookingExists = bookingRepository.findByRoom(reservation.getRoom()).stream()
            .anyMatch(b -> b.getUser().getUserId().equals(reservation.getUser().getUserId())
                && b.getCheckIn().equals(reservation.getCheckInDate())
                && b.getCheckOut().equals(reservation.getCheckOutDate()));
        if (!bookingExists) {
            Booking booking = new Booking();
            booking.setUser(reservation.getUser());
            booking.setRoom(reservation.getRoom());
            booking.setCheckIn(reservation.getCheckInDate());
            booking.setCheckOut(reservation.getCheckOutDate());
            booking.setNumberOfGuests(1); // or set from reservation if available
            booking.setTotalPrice(reservation.getTotalPrice());
            booking.setStatus("CONFIRMED");
            booking.setActive(true);
            bookingRepository.save(booking);
        }
        return savedReservation;
    }
    
    // Cancel reservation
    public Reservation cancelReservation(Long reservationId) {
        User currentUser = getCurrentUser();
        Reservation reservation = reservationRepository.findById(reservationId)
            .orElseThrow(() -> new RuntimeException("Reservation not found"));
            
        if (!reservation.getUser().equals(currentUser)) {
            throw new RuntimeException("Not authorized to cancel this reservation");
        }
        
        if (reservation.getCheckInDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Cannot cancel past reservations");
        }
        
        reservation.setStatus("CANCELLED");
        reservation.setPaymentStatus("REFUNDED");
        return reservationRepository.save(reservation);
    }
    
    // View reservation history
    public List<Reservation> getReservationHistory() {
        User currentUser = getCurrentUser();
        return reservationRepository.findByUserOrderByCheckInDateDesc(currentUser);
    }
    
    public void deleteUser(Long userId) {
        User currentUser = getCurrentUser();
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        if (!currentUser.getUserId().equals(userId)) {
            throw new RuntimeException("You can only delete your own account");
        }
        
        userRepository.delete(user);
    }

    // Fetch all available rooms for a hotel
    public List<Room> getAvailableRoomsByHotel(Long hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId)
            .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));
        return roomRepository.findByHotelAndIsAvailableTrue(hotel);
    }
} 