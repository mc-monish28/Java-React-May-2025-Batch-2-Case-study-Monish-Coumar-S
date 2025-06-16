package com.hexaware.sprint2.service;

import com.hexaware.sprint2.entity.Hotel;
import com.hexaware.sprint2.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HotelService {
    
    @Autowired
    private HotelRepository hotelRepository;
    
    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }
    
    public Hotel updateHotel(Long id, Hotel hotelDetails) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        
        hotel.setName(hotelDetails.getName());
        hotel.setLocation(hotelDetails.getLocation());
        hotel.setDescription(hotelDetails.getDescription());
        hotel.setRating(hotelDetails.getRating());
        hotel.setAmenities(hotelDetails.getAmenities());
        
        return hotelRepository.save(hotel);
    }
    
    public void deleteHotel(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotelRepository.delete(hotel);
    }
    
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
    }
    
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }
    
    public List<Hotel> getHotelsByLocation(String location) {
        return hotelRepository.findByLocation(location);
    }
    
    public List<Hotel> getHotelsByRating(Double rating) {
        return hotelRepository.findByRatingGreaterThanEqual(rating);
    }
} 