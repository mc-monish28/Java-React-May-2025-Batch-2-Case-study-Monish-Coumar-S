package com.hexaware.sprint2.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "hotels")
public class Hotel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String name;
    
    @NotBlank
    private String location;
    
    @NotBlank
    private String description;
    
    @NotNull
    private Double rating;
    
    @ElementCollection
    @CollectionTable(name = "hotel_amenities", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "amenity")
    private List<String> amenities;
    
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    private List<Room> rooms;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
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
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Double getRating() {
        return rating;
    }
    
    public void setRating(Double rating) {
        this.rating = rating;
    }
    
    public List<String> getAmenities() {
        return amenities;
    }
    
    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }
    
    public List<Room> getRooms() {
        return rooms;
    }
    
    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }
} 