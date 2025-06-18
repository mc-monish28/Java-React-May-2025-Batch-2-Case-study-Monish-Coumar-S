package com.hexaware.task4;

import org.springframework.stereotype.Component;

@Component("piano")
public class Piano implements Instrument {
    public void play() {
        System.out.println("Playing Piano tune...");
    }
}