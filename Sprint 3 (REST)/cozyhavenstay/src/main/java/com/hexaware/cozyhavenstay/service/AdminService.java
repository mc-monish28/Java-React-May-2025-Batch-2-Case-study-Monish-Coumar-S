package com.hexaware.cozyhavenstay.service;

import com.hexaware.cozyhavenstay.model.*;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.hexaware.cozyhavenstay.repository.UserRepository;
import java.util.Optional;
import com.hexaware.cozyhavenstay.repository.HotelRepository;
import com.hexaware.cozyhavenstay.repository.ReservationRepository;

@Service
public class AdminService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private ReservationRepository reservationRepository;

    // Admin login
    public UserLoginResponse adminLogin(UserLoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword()) && "ADMIN".equalsIgnoreCase(userOpt.get().getRole())) {
            User user = userOpt.get();
            return new UserLoginResponse("Login successful", user.getId(), user.getRole());
        } else {
            return new UserLoginResponse("Invalid admin credentials", null, null);
        }
    }
    // Admin registration
    public User adminRegister(UserRegistrationRequest request) {
        if (!"ADMIN".equalsIgnoreCase(request.getRole())) {
            throw new RuntimeException("Role must be ADMIN for admin registration");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("ADMIN");
        return userRepository.save(user);
    }
    // Hotel Owner registration
    public User registerHotelOwner(UserRegistrationRequest request) {
        if (!"OWNER".equalsIgnoreCase(request.getRole())) {
            throw new RuntimeException("Role must be OWNER for hotel owner registration");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("OWNER");
        return userRepository.save(user);
    }
    // CRUD for owners
    public List<User> getAllOwners() {
        return userRepository.findByRole("OWNER");
    }
    public User getOwner(Long ownerId) {
        Optional<User> ownerOpt = userRepository.findById(ownerId);
        if (ownerOpt.isPresent() && "OWNER".equalsIgnoreCase(ownerOpt.get().getRole())) {
            return ownerOpt.get();
        } else {
            throw new RuntimeException("Owner not found");
        }
    }
    public User updateOwner(Long ownerId, UserRegistrationRequest request) {
        Optional<User> ownerOpt = userRepository.findById(ownerId);
        if (ownerOpt.isPresent() && "OWNER".equalsIgnoreCase(ownerOpt.get().getRole())) {
            User owner = ownerOpt.get();
            owner.setName(request.getName());
            owner.setEmail(request.getEmail());
            owner.setPassword(request.getPassword());
            return userRepository.save(owner);
        } else {
            throw new RuntimeException("Owner not found");
        }
    }
    public void deleteOwner(Long ownerId) {
        Optional<User> ownerOpt = userRepository.findById(ownerId);
        if (ownerOpt.isPresent() && "OWNER".equalsIgnoreCase(ownerOpt.get().getRole())) {
            userRepository.deleteById(ownerId);
        } else {
            throw new RuntimeException("Owner not found");
        }
    }
    // CRUD for users
    public List<User> getAllUsers() {
        return userRepository.findByRole("USER");
    }
    public User getUser(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent() && "USER".equalsIgnoreCase(userOpt.get().getRole())) {
            return userOpt.get();
        } else {
            throw new RuntimeException("User not found");
        }
    }
    public User updateUser(Long userId, UserRegistrationRequest request) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent() && "USER".equalsIgnoreCase(userOpt.get().getRole())) {
            User user = userOpt.get();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }
    public void deleteUser(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent() && "USER".equalsIgnoreCase(userOpt.get().getRole())) {
            userRepository.deleteById(userId);
        } else {
            throw new RuntimeException("User not found");
        }
    }
    // CRUD for hotels
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }
    public Hotel createHotel(Hotel hotel) {
        if (hotel.getOwner() != null && hotel.getOwner().getId() != null) {
            userRepository.findById(hotel.getOwner().getId()).ifPresent(owner -> hotel.setOwner(owner));
        } else {
            hotel.setOwner(null);
        }
        return hotelRepository.save(hotel);
    }
    public Hotel getHotel(Long hotelId) {
        return hotelRepository.findById(hotelId).orElseThrow(() -> new RuntimeException("Hotel not found"));
    }
    public Hotel updateHotel(Long hotelId, Hotel hotel) {
        Hotel existing = hotelRepository.findById(hotelId).orElseThrow(() -> new RuntimeException("Hotel not found"));
        existing.setName(hotel.getName());
        existing.setLocation(hotel.getLocation());
        existing.setDescription(hotel.getDescription());
        if (hotel.getOwner() != null && hotel.getOwner().getId() != null) {
            userRepository.findById(hotel.getOwner().getId()).ifPresent(owner -> existing.setOwner(owner));
        }
        return hotelRepository.save(existing);
    }
    public void deleteHotel(Long hotelId) {
        hotelRepository.deleteById(hotelId);
    }
    // CRUD for bookings
    public List<Reservation> getAllBookings() {
        return reservationRepository.findAll();
    }
    public Reservation getBooking(Long bookingId) {
        return reservationRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    public void deleteBooking(Long bookingId) {
        reservationRepository.deleteById(bookingId);
    }
    // Logout
    public void logout() {
        // No-op: handled on frontend or by token/session invalidation
    }
    // Delete admin account
    public void deleteAdminAccount(Long adminId) {
        Optional<User> adminOpt = userRepository.findById(adminId);
        if (adminOpt.isPresent() && "ADMIN".equalsIgnoreCase(adminOpt.get().getRole())) {
            userRepository.deleteById(adminId);
        } else {
            throw new RuntimeException("Admin not found");
        }
    }
} 