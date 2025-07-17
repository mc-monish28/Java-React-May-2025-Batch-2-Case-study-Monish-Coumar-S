package com.hexaware.cozyhavenstay.dto;

public class JWTAuthResponseDTO {
	
	private String accessToken;
	private UserDTO userDto;
	
	
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String token) {
		this.accessToken = token;
	}
	
	public UserDTO getUserDto() {
		return userDto;
	}
	public void setUserDto(UserDTO userDto) {
		this.userDto = userDto;
	}
	
	public JWTAuthResponseDTO(String accessToken, UserDTO userDto) {
		super();
		this.accessToken = accessToken;
		
		this.userDto = userDto;
	}
	public JWTAuthResponseDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	}