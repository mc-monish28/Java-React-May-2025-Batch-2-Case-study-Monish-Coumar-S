package com.hexaware.sprint2.service;

import com.hexaware.sprint2.entity.Room;
import com.hexaware.sprint2.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomService {
    
    @Autowired
    private RoomRepository roomRepository;
    
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }
    
    public Room updateRoom(Long id, Room roomDetails) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        
        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setType(roomDetails.getType());
        room.setPrice(roomDetails.getPrice());
        room.setDescription(roomDetails.getDescription());
        room.setAmenities(roomDetails.getAmenities());
        
        return roomRepository.save(room);
    }
    
    public void deleteRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        roomRepository.delete(room);
    }
    
    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }
    
    public List<Room> getRoomsByHotelId(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }
    
    public List<Room> getRoomsByType(String type) {
        return roomRepository.findByType(type);
    }
    
    public List<Room> getRoomsByPrice(Double maxPrice) {
        return roomRepository.findByPriceLessThanEqual(maxPrice);
    }
} 