package com.hexaware.cozyhavenstay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cozyhavenstay.dto.JWTAuthResponseDTO;
import com.hexaware.cozyhavenstay.dto.LoginDTO;
import com.hexaware.cozyhavenstay.dto.RegisterDTO;
import com.hexaware.cozyhavenstay.service.AuthService;

@RequestMapping("/api/v1/auth")
@RestController
@CrossOrigin("http://localhost:3000")
public class AuthController {

	private AuthService authService;

	@Autowired
	public AuthController(AuthService authService) {
		super();
		this.authService = authService;
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterDTO dto) {
		String value = authService.register(dto);
		return new ResponseEntity<>(value, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<JWTAuthResponseDTO> login(@RequestBody LoginDTO dto) {
		JWTAuthResponseDTO token = authService.login(dto);
		return ResponseEntity.ok(token);
	}
}
