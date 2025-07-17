package com.hexaware.cozyhavenstay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(UserRole role);
    long countByRole(UserRole role);
} 