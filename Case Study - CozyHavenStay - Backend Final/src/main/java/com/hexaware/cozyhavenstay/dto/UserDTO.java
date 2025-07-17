package com.hexaware.cozyhavenstay.dto;

import com.hexaware.cozyhavenstay.enums.UserRole;

public class UserDTO {
	
	private Long userId;
	private String username;
    private String email;
    private String phoneNumber;
    private UserRole role;
    
    // Default constructor
    public UserDTO() {
    }
    
    public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

	// Getters and Setters
    public String getUsername() {
        return username;
    }
    public Long getUserId() {
 		return userId;
 	}

 	public void setUserId(Long userId) {
 		this.userId = userId;
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

   
} 