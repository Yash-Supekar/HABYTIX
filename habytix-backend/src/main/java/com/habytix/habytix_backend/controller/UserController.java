package com.habytix.habytix_backend.controller;

import com.habytix.habytix_backend.entity.User;
import com.habytix.habytix_backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (!user.getRole().equals("TENANT")
                && !user.getRole().equals("MANAGER")
                && !user.getRole().equals("STAFF")) {
            throw new RuntimeException("Invalid role");
        }

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User loginRequest) {

        User user = userRepository
                .findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(updatedUser.getFullName());
        user.setEmail(updatedUser.getEmail());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(updatedUser.getPassword());
        }

        return userRepository.save(user);
    }


    @GetMapping("/role/staff")
    public List<User> getAllStaff() {
        return userRepository.findByRole("STAFF");
    }

    @GetMapping("/role/tenant")
    public List<User> getAllTenants() {
        return userRepository.findAll()
                .stream()
                .filter(u -> "TENANT".equals(u.getRole()))
                .toList();
    }

}
