package com.hexaware.sprint2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hexaware.sprint2.entity.User;
import com.hexaware.sprint2.entity.User.UserRole;
import com.hexaware.sprint2.service.HotelService;
import com.hexaware.sprint2.service.RoomService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private RoomService roomService;

    @GetMapping("/dashboard")
    public String dashboard(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != UserRole.ADMIN) {
            return "redirect:/user/login";
        }
        
        model.addAttribute("user", user);
        model.addAttribute("hotels", hotelService.getAllHotels());
        return "admin-dashboard";
    }
} 