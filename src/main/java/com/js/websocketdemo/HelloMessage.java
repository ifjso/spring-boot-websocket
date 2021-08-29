package com.js.websocketdemo;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HelloMessage {

    private String name;

    public HelloMessage(String name) {
        this.name = name;
    }
}
