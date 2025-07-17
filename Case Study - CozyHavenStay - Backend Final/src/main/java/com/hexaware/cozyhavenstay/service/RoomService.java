package com.hexaware.cozyhavenstay.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhavenstay.dto.RoomDTO;
import com.hexaware.cozyhavenstay.entity.Hotel;
import com.hexaware.cozyhavenstay.entity.Room;
import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.enums.UserRole;
import com.hexaware.cozyhavenstay.repository.HotelRepository;
import com.hexaware.cozyhavenstay.repository.RoomRepository;

@Service
public class RoomService {
    
    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private HotelRepository hotelRepository;
    
    public Room createRoom(Long hotelId, RoomDTO roomDTO, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can create rooms");
        }
        
        Hotel hotel = hotelRepository.findById(hotelId)
            .orElseThrow(() -> new RuntimeException("Hotel not found"));
            
        if (!hotel.getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only create rooms in your own hotels");
        }
        
        Room room = new Room();
        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setRoomType(roomDTO.getRoomType());
        room.setDescription(roomDTO.getDescription());
        room.setPricePerNight(roomDTO.getPricePerNight());
        room.setMaxOccupancy(roomDTO.getMaxOccupancy());
        room.setHotel(hotel);
        
        return roomRepository.save(room);
    }
    
    public Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Room not found"));
    }
    
    public List<Room> getRoomsByHotel(Long hotelId, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can view their rooms");
        }
        
        Hotel hotel = hotelRepository.findById(hotelId)
            .orElseThrow(() -> new RuntimeException("Hotel not found"));
            
        if (!hotel.getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only view rooms in your own hotels");
        }
        
        return roomRepository.findByHotel(hotel);
    }
    
    public List<Room> getAvailableRoomsByHotel(Long hotelId, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can view their rooms");
        }
        
        Hotel hotel = hotelRepository.findById(hotelId)
            .orElseThrow(() -> new RuntimeException("Hotel not found"));
            
        if (!hotel.getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only view rooms in your own hotels");
        }
        
        return roomRepository.findByHotelAndIsAvailableTrue(hotel);
    }
    
    public Room updateRoom(Long roomId, RoomDTO roomDTO, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can update rooms");
        }
        
        Room room = getRoomById(roomId);
        
        if (!room.getHotel().getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only update rooms in your own hotels");
        }
        
        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setRoomType(roomDTO.getRoomType());
        room.setDescription(roomDTO.getDescription());
        room.setPricePerNight(roomDTO.getPricePerNight());
        room.setMaxOccupancy(roomDTO.getMaxOccupancy());
        
        return roomRepository.save(room);
    }
    
    public void deleteRoom(Long roomId, User owner) {
        if (owner.getRole() != UserRole.HOTEL_OWNER) {
            throw new RuntimeException("Only hotel owners can delete rooms");
        }
        
        Room room = getRoomById(roomId);
        
        if (!room.getHotel().getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You can only delete rooms in your own hotels");
        }
        
        room.setAvailable(false);
        roomRepository.save(room);
    }
} 