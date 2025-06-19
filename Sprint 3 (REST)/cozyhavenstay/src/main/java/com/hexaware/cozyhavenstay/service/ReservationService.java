package com.hexaware.cozyhavenstay.service;

import com.hexaware.cozyhavenstay.model.*;
import com.hexaware.cozyhavenstay.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private RoomRepository roomRepository;

    public Reservation makeReservation(ReservationRequest request) {
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        Optional<Hotel> hotelOpt = hotelRepository.findById(request.getHotelId());
        Optional<Room> roomOpt = roomRepository.findById(request.getRoomId());

        if (userOpt.isEmpty() || hotelOpt.isEmpty() || roomOpt.isEmpty()) {
            throw new RuntimeException("Invalid user, hotel, or room ID");
        }
        Room room = roomOpt.get();
        if (!room.isAvailable()) {
            throw new RuntimeException("Room is not available");
        }
        // Mark room as unavailable
        room.setAvailable(false);
        roomRepository.save(room);

        Reservation reservation = new Reservation();
        reservation.setUser(userOpt.get());
        reservation.setHotel(hotelOpt.get());
        reservation.setRoom(room);
        reservation.setCheckInDate(request.getCheckInDate());
        reservation.setCheckOutDate(request.getCheckOutDate());
        reservation.setStatus("BOOKED");
        return reservationRepository.save(reservation);
    }

    public Reservation cancelReservation(Long reservationId) {
        Optional<Reservation> reservationOpt = reservationRepository.findById(reservationId);
        if (reservationOpt.isEmpty()) {
            throw new RuntimeException("Reservation not found");
        }
        Reservation reservation = reservationOpt.get();
        if ("CANCELLED".equals(reservation.getStatus())) {
            throw new RuntimeException("Reservation is already cancelled");
        }
        reservation.setStatus("CANCELLED");
        // Mark the room as available again
        Room room = reservation.getRoom();
        room.setAvailable(true);
        roomRepository.save(room);
        return reservationRepository.save(reservation);
    }

    public java.util.List<Reservation> getReservationHistory(Long userId) {
        return reservationRepository.findByUserId(userId);
    }
} 