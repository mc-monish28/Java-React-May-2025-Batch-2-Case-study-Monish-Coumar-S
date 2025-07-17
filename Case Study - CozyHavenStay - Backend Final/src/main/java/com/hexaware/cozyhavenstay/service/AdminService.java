package com.hexaware.cozyhavenstay.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhavenstay.entity.Hotel;
import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.enums.UserRole;
import com.hexaware.cozyhavenstay.repository.HotelRepository;
import com.hexaware.cozyhavenstay.repository.UserRepository;

@Service
public class AdminService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private HotelRepository hotelRepository;
    
    // ========== HOTEL OWNER MANAGEMENT ==========
    
    // Get all hotel owners
    public List<User> getAllHotelOwners() {
        return userRepository.findByRole(UserRole.HOTEL_OWNER);
    }
    
    // Get hotel owner by ID
    public User getHotelOwnerById(Long ownerId) {
        User user = userRepository.findById(ownerId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + ownerId));
        
        if (user.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("User is not a hotel owner");
        }
        
        return user;
    }
    
    // Update hotel owner information
    public User updateHotelOwner(Long ownerId, User updatedOwner) {
        User existingOwner = getHotelOwnerById(ownerId);
        
        // Update only allowed fields
        existingOwner.setUsername(updatedOwner.getUsername());
        existingOwner.setEmail(updatedOwner.getEmail());
        existingOwner.setPhoneNumber(updatedOwner.getPhoneNumber());
        
        return userRepository.save(existingOwner);
    }
    
    // Delete hotel owner
    public void deleteHotelOwner(Long ownerId) {
        User hotelOwner = getHotelOwnerById(ownerId);
        
        // Check if hotel owner has hotels
        List<Hotel> hotels = hotelRepository.findByOwner(hotelOwner);
        if (!hotels.isEmpty()) {
            throw new RuntimeException("Cannot delete hotel owner with existing hotels. Please delete hotels first.");
        }
        
        userRepository.delete(hotelOwner);
    }
    
    // ========== HOTEL MANAGEMENT ==========
    
    // Get all hotels
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }
    
    // Get hotel by ID
    public Hotel getHotelById(Long hotelId) {
        return hotelRepository.findById(hotelId)
            .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));
    }
    
    // Get hotels by owner
    public List<Hotel> getHotelsByOwner(Long ownerId) {
        User hotelOwner = getHotelOwnerById(ownerId);
        return hotelRepository.findByOwner(hotelOwner);
    }
    
    // Delete hotel
    public void deleteHotel(Long hotelId) {
        Hotel hotel = getHotelById(hotelId);
        hotelRepository.delete(hotel);
    }
    
    // ========== STATISTICS ==========
    
    // Get admin statistics
    public Map<String, Object> getAdminStatistics() {
        long totalUsers = userRepository.count();
        long totalHotelOwners = userRepository.countByRole(UserRole.HOTEL_OWNER);
        long totalHotels = hotelRepository.count();
        
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalUsers", totalUsers);
        statistics.put("totalHotelOwners", totalHotelOwners);
        statistics.put("totalHotels", totalHotels);
        
        return statistics;
    }
} 