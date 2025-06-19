package com.hexaware.cozyhavenstay.service;

import com.hexaware.cozyhavenstay.model.Hotel;
import com.hexaware.cozyhavenstay.model.Room;
import com.hexaware.cozyhavenstay.repository.HotelRepository;
import com.hexaware.cozyhavenstay.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private RoomRepository roomRepository;

    public List<Hotel> searchHotels(String location, String name) {
        if (location != null && !location.isEmpty()) {
            return hotelRepository.findByLocationContainingIgnoreCase(location);
        } else if (name != null && !name.isEmpty()) {
            return hotelRepository.findByNameContainingIgnoreCase(name);
        } else {
            return hotelRepository.findAll();
        }
    }

    public Optional<Hotel> getHotelById(Long hotelId) {
        return hotelRepository.findById(hotelId);
    }

    public List<Room> getRoomsByHotelId(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }
} 