package com.hexaware.cozyhavenstay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cozyhavenstay.entity.Hotel;
import com.hexaware.cozyhavenstay.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotel(Hotel hotel);
    List<Room> findByHotelAndIsAvailableTrue(Hotel hotel);
    Room findByHotelAndRoomNumber(Hotel hotel, String roomNumber);
} 