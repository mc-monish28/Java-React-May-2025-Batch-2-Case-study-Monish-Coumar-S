package com.hexaware.cozyhavenstay.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhavenstay.dto.HotelDTO;
import com.hexaware.cozyhavenstay.entity.Hotel;
import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.enums.UserRole;
import com.hexaware.cozyhavenstay.repository.HotelRepository;

@Service
public class HotelService {
    
    @Autowired
    private HotelRepository hotelRepository;
    
    // Create new hotel
    public Hotel createHotel(HotelDTO hotelDTO, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can create hotels");
        }
        
        Hotel hotel = new Hotel();
        hotel.setHotelName(hotelDTO.getHotelName());
        hotel.setDescription(hotelDTO.getDescription());
        hotel.setAddress(hotelDTO.getAddress());
        hotel.setCity(hotelDTO.getCity());
        hotel.setState(hotelDTO.getState());
        hotel.setCountry(hotelDTO.getCountry());
        hotel.setZipCode(hotelDTO.getZipCode());
        hotel.setContactNumber(hotelDTO.getContactNumber());
        hotel.setEmail(hotelDTO.getEmail());
        hotel.setOwner(owner);
        
        return hotelRepository.save(hotel);
    }
    
    // Get all hotels by owner
    public List<Hotel> getHotelsByOwner(User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can view their hotels");
        }
        return hotelRepository.findByOwner(owner);
    }
    
    // Get hotel by ID
    public Hotel getHotelById(Long hotelId) {
        return hotelRepository.findById(hotelId)
            .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));
    }
    
    // Update hotel
    public Hotel updateHotel(Long hotelId, HotelDTO hotelDTO, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can update hotels");
        }
        
        Hotel hotel = getHotelById(hotelId);
        
        if (!hotel.getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only update your own hotels");
        }
        
        hotel.setHotelName(hotelDTO.getHotelName());
        hotel.setDescription(hotelDTO.getDescription());
        hotel.setAddress(hotelDTO.getAddress());
        hotel.setCity(hotelDTO.getCity());
        hotel.setState(hotelDTO.getState());
        hotel.setCountry(hotelDTO.getCountry());
        hotel.setZipCode(hotelDTO.getZipCode());
        hotel.setContactNumber(hotelDTO.getContactNumber());
        hotel.setEmail(hotelDTO.getEmail());
        
        return hotelRepository.save(hotel);
    }
    
    // Delete hotel (physical delete)
    public void deleteHotel(Long hotelId, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can delete hotels");
        }
        
        Hotel hotel = getHotelById(hotelId);
        
        if (!hotel.getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only delete your own hotels");
        }
        
        hotelRepository.delete(hotel);
    }
} 