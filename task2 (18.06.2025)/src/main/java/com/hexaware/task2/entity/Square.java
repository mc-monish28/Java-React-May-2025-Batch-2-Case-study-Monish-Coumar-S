package com.hexaware.task2.entity;

public class Square implements Shape {
    private double side;
    
    public Square(double side) {
        this.side = side;
    }
    
    @Override
    public double area() {
        return side * side;
    }
    
    public double getSide() {
        return side;
    }
} 