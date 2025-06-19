package com.hexaware.cozyhavenstay.service;

import com.hexaware.cozyhavenstay.model.Payment;
import com.hexaware.cozyhavenstay.model.PaymentRequest;
import com.hexaware.cozyhavenstay.model.Reservation;
import com.hexaware.cozyhavenstay.repository.PaymentRepository;
import com.hexaware.cozyhavenstay.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private ReservationRepository reservationRepository;

    public Payment processPayment(PaymentRequest request) {
        Optional<Reservation> reservationOpt = reservationRepository.findById(request.getReservationId());
        if (reservationOpt.isEmpty()) {
            throw new RuntimeException("Invalid reservation ID");
        }
        Reservation reservation = reservationOpt.get();
        // In a real app, add payment gateway integration and validation here
        Payment payment = new Payment();
        payment.setReservation(reservation);
        payment.setAmount(request.getAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setStatus("SUCCESS");
        return paymentRepository.save(payment);
    }
} 