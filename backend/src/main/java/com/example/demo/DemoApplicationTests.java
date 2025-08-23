package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = com.example.backend.BackendApplication.class) // 👈 point to your main application class
class DemoApplicationTests {

    @Test
    void contextLoads() {
        // This just checks if the Spring context starts successfully
    }
}
