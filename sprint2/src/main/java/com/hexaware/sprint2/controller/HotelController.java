package com.hexaware.sprint2.controller;

import com.hexaware.sprint2.entity.Hotel;
import com.hexaware.sprint2.entity.User;
import com.hexaware.sprint2.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/hotel")
public class HotelController {
    
    @Autowired
    private HotelService hotelService;
    
    @GetMapping("/list")
    public String listHotels(Model model) {
        List<Hotel> hotels = hotelService.getAllHotels();
        model.addAttribute("hotels", hotels);
        return "hotel-list";
    }
    
    @GetMapping("/view/{id}")
    public String viewHotel(@PathVariable Long id, Model model) {
        Hotel hotel = hotelService.getHotelById(id);
        model.addAttribute("hotel", hotel);
        return "hotel-details";
    }
    
    @GetMapping("/search")
    public String searchHotels(@RequestParam(required = false) String location,
                             @RequestParam(required = false) Double rating,
                             Model model) {
        List<Hotel> hotels;
        if (location != null && !location.isEmpty()) {
            hotels = hotelService.getHotelsByLocation(location);
        } else if (rating != null) {
            hotels = hotelService.getHotelsByRating(rating);
        } else {
            hotels = hotelService.getAllHotels();
        }
        model.addAttribute("hotels", hotels);
        return "hotel-list";
    }
    
    // Admin endpoints
    @GetMapping("/admin/create")
    public String showCreateForm(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != User.UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        model.addAttribute("hotel", new Hotel());
        return "hotel-form";
    }
    
    @PostMapping("/admin/create")
    public String createHotel(@ModelAttribute Hotel hotel, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != User.UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        hotelService.createHotel(hotel);
        return "redirect:/hotel/list";
    }
    
    @GetMapping("/admin/edit/{id}")
    public String showEditForm(@PathVariable Long id, HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != User.UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        Hotel hotel = hotelService.getHotelById(id);
        model.addAttribute("hotel", hotel);
        return "hotel-form";
    }
    
    @PostMapping("/admin/edit/{id}")
    public String updateHotel(@PathVariable Long id, @ModelAttribute Hotel hotel, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != User.UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        hotelService.updateHotel(id, hotel);
        return "redirect:/hotel/list";
    }
    
    @GetMapping("/admin/delete/{id}")
    public String deleteHotel(@PathVariable Long id, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != User.UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        hotelService.deleteHotel(id);
        return "redirect:/hotel/list";
    }
} 