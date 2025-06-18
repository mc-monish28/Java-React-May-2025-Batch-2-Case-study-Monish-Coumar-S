package com.hexaware.task4;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class MusicPlayer {

    private final Instrument instrument;

    @Autowired
    public MusicPlayer(@Qualifier("guitar") Instrument instrument) {
        this.instrument = instrument;
    }

    public void start() {
        instrument.play();
    }
}