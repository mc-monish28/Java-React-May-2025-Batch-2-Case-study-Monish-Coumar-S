package com.hexaware.cozyhavenstay.repository;

import com.hexaware.cozyhavenstay.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
} 