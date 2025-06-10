package com.staybooking;

public class Hotel {
    private int hotelId;
    private String name;
    private String location;
    private int availableRooms;

    public Hotel() {
    }

    public Hotel(int hotelId, String name, String location, int availableRooms) {
        this.hotelId = hotelId;
        this.name = name;
        this.location = location;
        this.availableRooms = availableRooms;
    }

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getAvailableRooms() {
        return availableRooms;
    }

    public void setAvailableRooms(int availableRooms) {
        this.availableRooms = availableRooms;
    }

    @Override
    public String toString() {
        return "Hotel { " +
                "Hotel ID=" + hotelId +
                ", Name='" + name + '\'' +
                ", Location='" + location + '\'' +
                ", Available Rooms=" + availableRooms +
                " }";
    }
}
