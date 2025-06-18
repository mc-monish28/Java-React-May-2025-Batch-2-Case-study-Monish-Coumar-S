package com.hexaware.task4;

import org.springframework.stereotype.Component;

@Component("guitar")
public class Guitar implements Instrument {
    public void play() {
        System.out.println("Playing Guitar melody...");
    }
}