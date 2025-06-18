package com.hexaware.task1.entity;

public class Rectangle implements Shape {
    private double length;
    private double width;
    
    public Rectangle() {
        
    }
    
    
    public void setLength(double length) {
        this.length = length;
    }
    
    public void setWidth(double width) {
        this.width = width;
    }
    
    @Override
    public double area() {
        return length * width;
    }
    
    public double getLength() {
        return length;
    }
    
    public double getWidth() {
        return width;
    }
    
    @Override
    public String toString() {
        return "Rectangle [length=" + length + ", width=" + width + ", area=" + area() + "]";
    }
} 