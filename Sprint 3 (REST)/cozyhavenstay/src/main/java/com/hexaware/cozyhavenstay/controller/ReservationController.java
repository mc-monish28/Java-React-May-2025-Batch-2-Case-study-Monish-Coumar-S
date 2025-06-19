package com.hexaware.cozyhavenstay.controller;

import com.hexaware.cozyhavenstay.model.Reservation;
import com.hexaware.cozyhavenstay.model.ReservationRequest;
import com.hexaware.cozyhavenstay.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/reservations")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<Reservation> makeReservation(@RequestBody ReservationRequest request) {
        try {
            Reservation reservation = reservationService.makeReservation(request);
            return ResponseEntity.ok(reservation);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Reservation> cancelReservation(@PathVariable Long reservationId) {
        try {
            Reservation reservation = reservationService.cancelReservation(reservationId);
            return ResponseEntity.ok(reservation);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/history")
    public ResponseEntity<java.util.List<com.hexaware.cozyhavenstay.model.Reservation>> getReservationHistory(@RequestParam Long userId) {
        java.util.List<com.hexaware.cozyhavenstay.model.Reservation> history = reservationService.getReservationHistory(userId);
        return ResponseEntity.ok(history);
    }
} 