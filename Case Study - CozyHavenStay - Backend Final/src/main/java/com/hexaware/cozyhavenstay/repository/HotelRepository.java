package com.hexaware.cozyhavenstay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cozyhavenstay.entity.Hotel;
import com.hexaware.cozyhavenstay.entity.User;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByOwner(User owner);
    List<Hotel> findByCityIgnoreCase(String city);
    List<Hotel> findByHotelNameContainingIgnoreCase(String name);
} 