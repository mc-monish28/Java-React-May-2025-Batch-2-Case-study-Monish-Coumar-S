package com.hexaware.cozyhavenstay.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhavenstay.dto.JWTAuthResponseDTO;
import com.hexaware.cozyhavenstay.dto.LoginDTO;
import com.hexaware.cozyhavenstay.dto.RegisterDTO;
import com.hexaware.cozyhavenstay.dto.UserDTO;
import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.repository.UserRepository;
import com.hexaware.cozyhavenstay.security.JWTTokenProvider;

@Service
public class AuthService {

	private AuthenticationManager authenticationManager;
	private UserRepository userRepo;
	private PasswordEncoder passwordEncoder;
	private JWTTokenProvider jwtTokenProvider;

	@Autowired
	public AuthService(AuthenticationManager authenticationManager, UserRepository userRepo,
			PasswordEncoder passwordEncoder, JWTTokenProvider jwtTokenProvider) {
		super();
		this.authenticationManager = authenticationManager;
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenProvider = jwtTokenProvider;
	}
	
	
	public String register(RegisterDTO dto) {
		if (userRepo.existsByEmail(dto.getEmail())) {
			throw new RuntimeException("Email Already Exists in DB");
		}
		User user = new User();
		user.setUsername(dto.getUsername());
		user.setEmail(dto.getEmail());
		user.setPhoneNumber(dto.getPhoneNumber());
		user.setRole(dto.getRole());
//		user.setPassword(dto.getPassword());
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
		userRepo.save(user);
		return "Registered Successfully !!";
	}
	
	





	public JWTAuthResponseDTO login(LoginDTO dto) {
	    Authentication authentication = authenticationManager.authenticate(
	        new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()) // valid
	    );
	    SecurityContextHolder.getContext().setAuthentication(authentication);
	    String token = jwtTokenProvider.generateToken(authentication);
	    User user = userRepo.findByEmail(dto.getEmail());
	        
	    UserDTO userDto = new UserDTO();
	    userDto.setUserId(user.getUserId());
	    userDto.setUsername(user.getUsername());
	    userDto.setEmail(user.getEmail());
	    userDto.setPhoneNumber(user.getPhoneNumber());
	    userDto.setRole(user.getRole());
	    return new JWTAuthResponseDTO(token,userDto);
	}

	
}
