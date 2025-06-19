package com.hexaware.cozyhavenstay.repository;

import com.hexaware.cozyhavenstay.model.Room;
import com.hexaware.cozyhavenstay.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotel(Hotel hotel);
    List<Room> findByHotelId(Long hotelId);
} 