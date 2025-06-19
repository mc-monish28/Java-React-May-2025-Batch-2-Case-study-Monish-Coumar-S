package com.hexaware.cozyhavenstay.repository;

import com.hexaware.cozyhavenstay.model.Hotel;
import com.hexaware.cozyhavenstay.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByLocationContainingIgnoreCase(String location);
    List<Hotel> findByNameContainingIgnoreCase(String name);
    List<Hotel> findByOwner(User owner);
} 