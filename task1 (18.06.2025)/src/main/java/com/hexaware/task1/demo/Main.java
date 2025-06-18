package com.hexaware.task1.demo;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.hexaware.task1.entity.Rectangle;
import com.hexaware.task1.entity.Square;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {

        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        System.out.println("Task 1:");

        Rectangle rectangle = (Rectangle) context.getBean("rectangle");
        System.out.println("Area of Rectangle: " + rectangle.area());

        Square square = (Square) context.getBean("square");
        System.out.println("Area of Square: " + square.area());

    }
}