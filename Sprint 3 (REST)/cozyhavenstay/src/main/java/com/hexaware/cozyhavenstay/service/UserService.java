package com.hexaware.cozyhavenstay.service;

import com.hexaware.cozyhavenstay.model.User;
import com.hexaware.cozyhavenstay.model.UserRegistrationRequest;
import com.hexaware.cozyhavenstay.model.UserLoginRequest;
import com.hexaware.cozyhavenstay.model.UserLoginResponse;
import com.hexaware.cozyhavenstay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(UserRegistrationRequest request) {
        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In real apps, hash the password!
        user.setRole(request.getRole() != null ? request.getRole() : "USER");
        return userRepository.save(user);
    }

    public UserLoginResponse loginUser(UserLoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword())) {
            User user = userOpt.get();
            return new UserLoginResponse("Login successful", user.getId(), user.getRole());
        } else {
            return new UserLoginResponse("Invalid email or password", null, null);
        }
    }
} 