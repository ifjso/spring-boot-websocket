package com.js.websocketdemo;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Greeting {

    private String content;

    public Greeting(String content) {
        this.content = content;
    }

    public static Greeting from(String content) {
        return new Greeting(content);
    }
}
