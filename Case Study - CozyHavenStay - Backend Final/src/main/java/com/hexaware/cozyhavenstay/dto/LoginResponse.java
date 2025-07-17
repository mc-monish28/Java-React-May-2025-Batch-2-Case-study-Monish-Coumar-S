package com.hexaware.cozyhavenstay.dto;

public class LoginResponse {
    private Long adminId;
    private String username;
    private String email;
    private String message;
    private boolean success;
    
    // Default constructor
    public LoginResponse() {
    }
    
    // Success response constructor
    public LoginResponse(Long adminId, String username, String email) {
        this.adminId = adminId;
        this.username = username;
        this.email = email;
        this.success = true;
        this.message = "Login successful";
    }
    
    // Failure response constructor
    public LoginResponse(String message) {
        this.success = false;
        this.message = message;
    }
    
    // Getters and Setters
    public Long getAdminId() {
        return adminId;
    }
    
    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
} 