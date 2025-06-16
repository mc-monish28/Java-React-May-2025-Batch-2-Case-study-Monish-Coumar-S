package com.hexaware.sprint2.repository;

import com.hexaware.sprint2.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotelId(Long hotelId);
    List<Room> findByType(String type);
    List<Room> findByPriceLessThanEqual(Double price);
} 