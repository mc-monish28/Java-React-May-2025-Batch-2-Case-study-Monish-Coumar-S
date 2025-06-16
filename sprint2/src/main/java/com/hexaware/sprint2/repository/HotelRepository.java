package com.hexaware.sprint2.repository;

import com.hexaware.sprint2.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByLocation(String location);
    List<Hotel> findByRatingGreaterThanEqual(Double rating);
} 