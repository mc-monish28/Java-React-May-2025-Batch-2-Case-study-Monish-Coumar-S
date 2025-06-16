package com.hexaware.sprint2.controller;

import com.hexaware.sprint2.entity.User;
import com.hexaware.sprint2.service.UserService;
import com.hexaware.sprint2.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private HotelService hotelService;
    
    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }
    
    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, Model model) {
        try {
            userService.registerUser(user);
            return "redirect:/user/login";
        } catch (RuntimeException e) {
            model.addAttribute("error", e.getMessage());
            return "register";
        }
    }
    
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }
    
    @PostMapping("/login")
    public String loginUser(@RequestParam String username,
                          @RequestParam String password,
                          HttpSession session,
                          Model model) {
        try {
            User user = userService.loginUser(username, password);
            session.setAttribute("user", user);
            
            if (user.getRole() == User.UserRole.ADMIN) {
                return "redirect:/admin/dashboard";
            } else {
                return "redirect:/user/dashboard";
            }
        } catch (RuntimeException e) {
            model.addAttribute("error", e.getMessage());
            return "login";
        }
    }
    
    @GetMapping("/dashboard")
    public String showUserDashboard(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/user/login";
        }
        model.addAttribute("user", user);
        model.addAttribute("hotels", hotelService.getAllHotels());
        return "user-dashboard";
    }
    
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/user/login";
    }
} 