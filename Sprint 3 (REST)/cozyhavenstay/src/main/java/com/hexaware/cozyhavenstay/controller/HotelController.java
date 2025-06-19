package com.hexaware.cozyhavenstay.controller;

import com.hexaware.cozyhavenstay.model.Hotel;
import com.hexaware.cozyhavenstay.model.Room;
import com.hexaware.cozyhavenstay.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/hotels")
public class HotelController {
    @Autowired
    private HotelService hotelService;

    @GetMapping
    public ResponseEntity<List<Hotel>> searchHotels(@RequestParam(required = false) String location,
                                                    @RequestParam(required = false) String name) {
        List<Hotel> hotels = hotelService.searchHotels(location, name);
        return ResponseEntity.ok(hotels);
    }

    @GetMapping("/{hotelId}")
    public ResponseEntity<Hotel> getHotel(@PathVariable Long hotelId) {
        return hotelService.getHotelById(hotelId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<List<Room>> getRooms(@PathVariable Long hotelId) {
        List<Room> rooms = hotelService.getRoomsByHotelId(hotelId);
        return ResponseEntity.ok(rooms);
    }
} 