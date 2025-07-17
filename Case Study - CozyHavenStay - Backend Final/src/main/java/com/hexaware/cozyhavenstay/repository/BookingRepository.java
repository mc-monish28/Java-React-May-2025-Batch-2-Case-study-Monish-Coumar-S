package com.hexaware.cozyhavenstay.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hexaware.cozyhavenstay.entity.Booking;
import com.hexaware.cozyhavenstay.entity.Room;
import com.hexaware.cozyhavenstay.entity.User;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByRoom(Room room);
    List<Booking> findByRoomAndIsActiveTrue(Room room);
    List<Booking> findByUser(User user);
    
    @Query("SELECT b FROM Booking b WHERE b.room = ?1 AND b.checkIn <= ?3 AND b.checkOut >= ?2")
    List<Booking> findOverlappingBookings(Room room, LocalDate checkIn, LocalDate checkOut);
} 