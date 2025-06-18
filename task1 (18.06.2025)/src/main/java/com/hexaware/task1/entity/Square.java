package com.hexaware.task1.entity;

public class Square implements Shape {
    private double side;

    public Square() {

    }

    public void setSide(double side) {
        this.side = side;
    }

    @Override
    public double area() {
        return side * side;
    }

    public double getSide() {
        return side;
    }

    @Override
    public String toString() {
        return "Square [side=" + side + ", area=" + area() + "]";
    }
}