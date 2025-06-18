package com.hexaware.task3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class Task3Application {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(Task3Application.class, args);
		NotificationManager notificationManager = context.getBean(NotificationManager.class);
		notificationManager.notifyUser("Hello!");

	}

}
