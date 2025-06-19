package com.hexaware.cozyhavenstay.model;

public class UserLoginResponse {
    private String message;
    private Long userId;
    private String role;

    public UserLoginResponse() {}
    public UserLoginResponse(String message, Long userId) {
        this.message = message;
        this.userId = userId;
    }
    public UserLoginResponse(String message, Long userId, String role) {
        this.message = message;
        this.userId = userId;
        this.role = role;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
} 