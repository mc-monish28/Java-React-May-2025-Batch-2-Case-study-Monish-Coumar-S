package com.hexaware.task3;

import org.springframework.stereotype.Service;

@Service
public class SMSNotification implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Sending SMS: " + message);
    }
}