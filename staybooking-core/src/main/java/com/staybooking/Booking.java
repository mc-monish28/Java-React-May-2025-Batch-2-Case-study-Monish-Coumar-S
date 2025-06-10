package com.staybooking;

import java.time.LocalDate;

public class Booking {
    private int bookingId;
    private int userId;
    private int hotelId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    public Booking() {
    }

    public Booking(int bookingId, int userId, int hotelId, LocalDate checkInDate, LocalDate checkOutDate) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.hotelId = hotelId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    @Override
    public String toString() {
        return "Booking { " +
                "Booking ID=" + bookingId +
                ", User ID=" + userId +
                ", Hotel ID=" + hotelId +
                ", Check-In=" + checkInDate +
                ", Check-Out=" + checkOutDate +
                " }";
    }
}
