package com.hexaware.cozyhavenstay.repository;

import com.hexaware.cozyhavenstay.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
} 