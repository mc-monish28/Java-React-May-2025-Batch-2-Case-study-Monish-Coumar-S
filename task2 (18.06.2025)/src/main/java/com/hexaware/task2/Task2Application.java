package com.hexaware.task2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import com.hexaware.task2.entity.Rectangle;
import com.hexaware.task2.entity.Shape;
import com.hexaware.task2.entity.Square;

@SpringBootApplication
public class Task2Application {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(Task2Application.class, args);

		Shape rectangle = context.getBean(Rectangle.class);
		System.out.println("Area of Rectangle" + rectangle.area());

		Shape square = context.getBean(Square.class);
		System.out.println("Area of Square:" + square.area());
	}

	@Bean
	public Rectangle rectangle() {
		return new Rectangle(5.0, 3.0);
	}

	@Bean
	public Square square() {
		return new Square(4.0);
	}
}
