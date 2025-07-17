package com.hexaware.cozyhavenstay.dto;

public class LogoutResponse {
    private String message;
    private boolean success;

    public LogoutResponse(String message) {
        this.message = message;
        this.success = true;
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