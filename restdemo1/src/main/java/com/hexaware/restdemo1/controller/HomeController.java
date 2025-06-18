package com.hexaware.restdemo1.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Product REST API! Visit /api/products/ to see all products.";
    }

    @GetMapping("/api")
    public Map<String, Object> apiInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("message", "Product REST API is running");
        info.put("version", "1.0");
        info.put("endpoints", new String[]{
            "GET /api/products/ - Get all products",
            "POST /api/products/ - Create a new product",
            "GET /api/products/{id} - Get product by ID",
            "PUT /api/products/{id} - Update product by ID",
            "DELETE /api/products/{id} - Delete product by ID"
        });
        return info;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("message", "Application is running successfully");
        return status;
    }
} 