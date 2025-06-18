package com.hexaware.task1;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.hexaware.task1.entity.Rectangle;
import com.hexaware.task1.entity.Shape;
import com.hexaware.task1.entity.Square;

import static org.junit.jupiter.api.Assertions.*;

public class ShapeTest {

    @Test
    public void testRectangleArea() {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Rectangle rectangle = (Rectangle) context.getBean("rectangle");
        
        // Rectangle with length=10.0 and width=5.0 should have area=50.0
        assertEquals(50.0, rectangle.area(), 0.001);
        assertEquals(10.0, rectangle.getLength(), 0.001);
        assertEquals(5.0, rectangle.getWidth(), 0.001);
        
        ((ClassPathXmlApplicationContext) context).close();
    }

    @Test
    public void testSquareArea() {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Square square = (Square) context.getBean("square");
        
        // Square with side=7.0 should have area=49.0
        assertEquals(49.0, square.area(), 0.001);
        assertEquals(7.0, square.getSide(), 0.001);
        
        ((ClassPathXmlApplicationContext) context).close();
    }

    @Test
    public void testShapeInterface() {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Shape rectangleShape = (Shape) context.getBean("rectangle");
        Shape squareShape = (Shape) context.getBean("square");
        
        // Test polymorphic behavior
        assertTrue(rectangleShape instanceof Rectangle);
        assertTrue(squareShape instanceof Square);
        assertTrue(rectangleShape instanceof Shape);
        assertTrue(squareShape instanceof Shape);
        
        ((ClassPathXmlApplicationContext) context).close();
    }
} 