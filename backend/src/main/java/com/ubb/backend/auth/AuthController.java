package com.ubb.backend.auth;

import com.ubb.backend.security.JWTUtil;
import com.ubb.backend.user.User;
import com.ubb.backend.user.UserService;
import com.ubb.backend.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO) {
        try {
            var authToken = new UsernamePasswordAuthenticationToken(userDTO.email(), userDTO.password());
            String email = authToken.getName();

            User user = userService.findByEmail(email);

            Authentication authentication = authenticationManager.authenticate(authToken);
            String jwt = jwtUtil.generateToken(authentication.getName(), user.getId());
            return jwt;
        } catch (AuthenticationException | NoSuchElementException e) {
            System.out.println(e.getMessage());
            return "Invalid username or password";
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        try {
            try {
                userService.findByEmail(userDTO.email());
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email already registered");
            } catch (NoSuchElementException _) {}

            if (!User.isPasswordValid(userDTO.password())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Password must contain at least 8 characters, " +
                                "one uppercase letter, one lowercase letter, " +
                                "one number, and one special character");
            }

            User newUser = new User();
            newUser.setEmail(userDTO.email());
            newUser.setName(userDTO.name());
            newUser.setPassword(userDTO.password());
            newUser.setTimeZone(userDTO.timeZone() != null ?
                    java.util.TimeZone.getTimeZone(userDTO.timeZone()) :
                    java.util.TimeZone.getDefault());
            userService.save(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
}
