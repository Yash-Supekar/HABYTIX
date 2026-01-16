package com.habytix.habytix_backend.repository;

import com.habytix.habytix_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    // 🔹 NEW — Fetch users by role (STAFF)
    List<User> findByRole(String role);
}
