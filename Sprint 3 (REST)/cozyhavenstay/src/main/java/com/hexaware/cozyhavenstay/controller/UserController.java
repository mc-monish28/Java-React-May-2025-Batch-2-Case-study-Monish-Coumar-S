package com.hexaware.cozyhavenstay.controller;

import com.hexaware.cozyhavenstay.model.UserRegistrationRequest;
import com.hexaware.cozyhavenstay.model.UserLoginRequest;
import com.hexaware.cozyhavenstay.model.UserLoginResponse;
import com.hexaware.cozyhavenstay.model.User;
import com.hexaware.cozyhavenstay.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserRegistrationRequest request) {
        try {
            // Prevent registration of ADMIN or OWNER via this endpoint
            if (request.getRole() != null && (request.getRole().equalsIgnoreCase("ADMIN") || request.getRole().equalsIgnoreCase("OWNER"))) {
                return ResponseEntity.status(403).build();
            }
            User user = userService.registerUser(request);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest request) {
        UserLoginResponse response = userService.loginUser(request);
        if (response.getUserId() != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }
} 