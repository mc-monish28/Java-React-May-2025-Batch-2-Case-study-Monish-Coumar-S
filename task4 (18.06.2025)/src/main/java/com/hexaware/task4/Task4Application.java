package com.hexaware.task4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class Task4Application {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(Task4Application.class, args);
        MusicPlayer player = context.getBean(MusicPlayer.class);
        player.start();
	}

}
