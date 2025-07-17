package com.hexaware.cozyhavenstay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cozyhavenstay.entity.Reservation;
import com.hexaware.cozyhavenstay.entity.User;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);
    List<Reservation> findByUserOrderByCheckInDateDesc(User user);
} 