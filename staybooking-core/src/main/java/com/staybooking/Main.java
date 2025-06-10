package com.staybooking;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {

        // Create a User
        User user = new User(1, "Monish Coumar", "monish@example.com", "securePassword123");
        System.out.println("User Details:");
        System.out.println(user);

        // Create a Hotel
        Hotel hotel = new Hotel(101, "Cozy Haven Residency", "Chennai", 15);
        System.out.println("\nHotel Details:");
        System.out.println(hotel);

        // Create a Booking
        Booking booking = new Booking(
                1001,
                user.getId(),
                hotel.getHotelId(),
                LocalDate.of(2025, 6, 20),
                LocalDate.of(2025, 6, 23));
        System.out.println("\nBooking Details:");
        System.out.println(booking);

        // Demonstrate setter usage
        hotel.setAvailableRooms(hotel.getAvailableRooms() - 1);
        System.out.println("\n[After booking] Updated Room Availability:");
        System.out.println("Available Rooms in " + hotel.getName() + ": " + hotel.getAvailableRooms());
    }
}
