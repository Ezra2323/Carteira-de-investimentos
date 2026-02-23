package com.ufop.investiments.config;

//import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // permite todos os endpoints
                .allowedOrigins("http://localhost:5173") // frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // métodos permitidos
                .allowedHeaders("*");
    }
}
