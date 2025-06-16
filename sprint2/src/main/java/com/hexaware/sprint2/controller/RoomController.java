package com.hexaware.sprint2.controller;

import com.hexaware.sprint2.entity.Room;
import com.hexaware.sprint2.entity.User;
import com.hexaware.sprint2.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/room")
public class RoomController {
    
    @Autowired
    private RoomService roomService;
    
    @GetMapping("/hotel/{hotelId}")
    public String listRoomsByHotel(@PathVariable Long hotelId, Model model) {
        List<Room> rooms = roomService.getRoomsByHotelId(hotelId);
        model.addAttribute("rooms", rooms);
        return "room-list";
    }
    
    @GetMapping("/view/{id}")
    public String viewRoom(@PathVariable Long id, Model model) {
        Room room = roomService.getRoomById(id);
        model.addAttribute("room", room);
        return "room-details";
    }
    
    @GetMapping("/search")
    public String searchRooms(@RequestParam(required = false) String type,
                            @RequestParam(required = false) Double maxPrice,
                            Model model) {
        List<Room> rooms;
        if (type != null && !type.isEmpty()) {
            rooms = roomService.getRoomsByType(type);
        } else if (maxPrice != null) {
            rooms = roomService.getRoomsByPrice(maxPrice);
        } else {
            rooms = roomService.getRoomsByHotelId(null);
        }
        model.addAttribute("rooms", rooms);
        return "room-list";
    }
    
    // Admin endpoints
    @GetMapping("/admin/create/{hotelId}")
    public String showCreateForm(@PathVariable Long hotelId, HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != User.UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        Room room = new Room();
        model.addAttribute("room", room);
        model.addAttribute("hotelId", hotelId);
        return "room-form";
    }
    
    @PostMapping("/admin/create/{hotelId}")
    public String createRoom(@PathVariable Long hotelId, @ModelAttribute Room room, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != User.UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        roomService.createRoom(room);
        return "redirect:/room/hotel/" + hotelId;
    }
    
    @GetMapping("/admin/edit/{id}")
    public String showEditForm(@PathVariable Long id, HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != User.UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        Room room = roomService.getRoomById(id);
        model.addAttribute("room", room);
        return "room-form";
    }
    
    @PostMapping("/admin/edit/{id}")
    public String updateRoom(@PathVariable Long id, @ModelAttribute Room room, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != User.UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        roomService.updateRoom(id, room);
        return "redirect:/room/hotel/" + room.getHotel().getId();
    }
    
    @GetMapping("/admin/delete/{id}")
    public String deleteRoom(@PathVariable Long id, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != User.UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        Room room = roomService.getRoomById(id);
        Long hotelId = room.getHotel().getId();
        roomService.deleteRoom(id);
        return "redirect:/room/hotel/" + hotelId;
    }
} 